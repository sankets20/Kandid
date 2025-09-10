"use client";

import * as React from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Users, Clock, XCircle, UserCheck } from "lucide-react";
import { useVirtualizer } from "@tanstack/react-virtual";

// Dummy API
async function fetchCampaigns({ pageParam = 0 }): Promise<any[]> {
  const res = await fetch(`/api/campaigns?page=${pageParam}`);
  if (!res.ok) throw new Error("Failed to fetch campaigns");
  return res.json();
}



type Campaign = Awaited<ReturnType<typeof fetchCampaigns>>[0];

export default function CampaignsPage() {
  const [filter, setFilter] = React.useState("all");

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending,
    isError,
    isSuccess,
  } = useInfiniteQuery({
    queryKey: ["campaigns", filter],
    queryFn: ({ pageParam = 0 }) => fetchCampaigns({ pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) =>
      pages.length < 20 ? pages.length : undefined,
    staleTime: 1000 * 60 * 1,
    gcTime: 1000 * 60 * 5,
  });

  const campaigns: Campaign[] = React.useMemo(
    () => data?.pages.flat() ?? [],
    [data]
  );

  const columns: ColumnDef<Campaign>[] = [
    { header: "Campaign Name", accessorKey: "name" },
    {
      header: "Status",
      cell: ({ row }) => (
        <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700">
          {row.original.status}
        </span>
      ),
    },
    {
      header: "Total Leads",
      cell: ({ row }) => (
        <div className="flex items-center gap-1">
          <Users className="h-4 w-4 text-gray-500" />
          {row.original.leads}
        </div>
      ),
    },
    {
      header: "Request Status",
      cell: ({ row }) => {
        const { accepted, pending, failed } = row.original.requestStatus;
        return (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-green-600">
              <UserCheck className="h-4 w-4" /> {accepted}
            </div>
            <div className="flex items-center gap-1 text-yellow-600">
              <Clock className="h-4 w-4" /> {pending}
            </div>
            <div className="flex items-center gap-1 text-red-600">
              <XCircle className="h-4 w-4" /> {failed}
            </div>
          </div>
        );
      },
    },
    {
  header: "Connection Status",
  cell: ({ row }) => {
    // safe destructuring with fallback
    const { connected = false, messages = 0 } = row.original.connectionStatus ?? {};

    return (
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1 text-blue-600">
          {connected ? "✅ Connected" : "❌ Not Connected"}
        </div>
        <div className="text-gray-500">Messages: {messages}</div>
      </div>
    );
  },
}
  ];

  const table = useReactTable({
    data: campaigns,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  // Virtualization
  const parentRef = React.useRef<HTMLDivElement>(null);
  const rowVirtualizer = useVirtualizer({
    count: table.getRowModel().rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 60,
    overscan: 10,
    // ❌ remove keyExtractor
  });

  // Infinite Scroll
  const loadMoreRef = React.useRef<HTMLDivElement | null>(null);
  React.useEffect(() => {
    if (!loadMoreRef.current || !hasNextPage) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    });
    const el = loadMoreRef.current;
    observer.observe(el);
    return () => {
      observer.unobserve(el);
      observer.disconnect();
    };
  }, [hasNextPage, fetchNextPage, isFetchingNextPage]);

  return (
    <div className="p-6 space-y-4 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Campaigns</h1>
        <Button>Create Campaign</Button>
      </div>

      {/* Filter Tabs + Search */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          {["all", "active", "inactive"].map((f) => (
            <Button
              key={f}
              variant={filter === f ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(f)}
            >
              {f === "all"
                ? "All Campaigns"
                : f.charAt(0).toUpperCase() + f.slice(1)}
            </Button>
          ))}
        </div>
        <Input placeholder="Search campaigns..." className="w-64" />
      </div>

      {/* Table with Virtual Scroll */}
     <Card className="p-0 overflow-hidden h-[520px]">
  {isPending && <div className="p-6 text-center">Loading campaigns...</div>}
  {isError && (
    <div className="p-6 text-center text-red-500">
      Failed to load campaigns.
    </div>
  )}

  {isSuccess && (
    <div
      ref={parentRef}
      className="h-[600px] overflow-auto relative" // ✅ keep height consistent
    >
      <table className="w-full text-sm border-collapse">
        <thead className="sticky top-0 bg-gray-50 z-10">
          {table.getHeaderGroups().map((hg) => (
            <tr key={hg.id}>
              {hg.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-4 py-2 text-left font-medium text-gray-600 whitespace-nowrap"
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            position: "relative",
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualRow) => {
            const row = table.getRowModel().rows[virtualRow.index];
            return (
              <tr
               key={`${row.original.id ?? "row"}-${virtualRow.index}`}
                className="border-b hover:bg-gray-50"
                style={{
                  position: "absolute",
                  top: 0,
                  transform: `translateY(${virtualRow.start}px)`,
                  display: "flex", // ✅ fix misalignment
                  width: "100%",
                }}
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-4 py-3 whitespace-nowrap flex-1"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      <div
        ref={loadMoreRef}
        className="h-10 flex items-center justify-center text-gray-500"
      >
        {isFetchingNextPage && "Loading more..."}
      </div>
    </div>
  )}
</Card>

    </div>
  );
}
