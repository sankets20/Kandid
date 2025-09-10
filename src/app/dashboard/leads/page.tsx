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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

// Dummy API (mock data)
async function fetchLeads({ pageParam = 0 }): Promise<any[]> {
  const res = await fetch(`/api/leads?page=${pageParam}`);
  if (!res.ok) throw new Error("Failed to fetch leads");
  return res.json();
}

type Lead = {
  id: number;
  name: string;
  role: string;
  company: string;
  activity: number;
  status: { label: string; type: string };
};

export default function LeadsPage() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending,
    isError,
    isSuccess,
  } = useInfiniteQuery({
    queryKey: ["leads"],
    queryFn: ({ pageParam = 0 }) => fetchLeads({ pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) =>
      pages.length < 10 ? pages.length : undefined,
    staleTime: 1000 * 60 * 1, // ✅ keep data fresh for 1 min
    gcTime: 1000 * 60 * 5, // ✅ keep in cache for 5 min
  });

  const leads: Lead[] = data?.pages.flat() ?? [];

  const columns: ColumnDef<Lead>[] = [
    {
      header: "Name",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/avatar.png" />
            <AvatarFallback>{row.original.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{row.original.name}</div>
            <div className="text-xs text-gray-500">{row.original.role}</div>
          </div>
        </div>
      ),
    },
    {
      header: "Campaign Name",
      accessorKey: "company",
    },
    {
      header: "Activity",
      cell: ({ row }) => (
        <div className="flex gap-1">
          {Array.from({ length: row.original.activity }).map((_, i) => (
            <div key={i} className="h-4 w-1 rounded bg-yellow-500" />
          ))}
        </div>
      ),
    },
    {
      header: "Status",
      cell: ({ row }) => {
        const { type, label } = row.original.status;
        return (
          <span
            className={cn(
              "px-2 py-1 text-xs rounded-full",
              type === "pending" && "bg-purple-100 text-purple-700",
              type === "sent" && "bg-orange-100 text-orange-700",
              type === "followup" && "bg-blue-100 text-blue-700"
            )}
          >
            {label}
          </span>
        );
      },
    },
  ];

  const table = useReactTable({
    data: leads,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-6">
      <Card className="p-0 overflow-hidden">
        {isPending && <div className="p-6 text-center">Loading leads...</div>}
        {isError && (
          <div className="p-6 text-center text-red-500">
            Failed to load leads.
          </div>
        )}

        {isSuccess && (
          <div className="max-h-[600px] overflow-y-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 sticky top-0 z-10">
                {table.getHeaderGroups().map((hg) => (
                  <tr key={hg.id}>
                    {hg.headers.map((header) => (
                      <th
                        key={header.id}
                        className="px-4 py-2 text-left font-medium text-gray-600"
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
              <tbody>
                {table.getRowModel().rows.map((row) => (
                  <tr key={row.id} className="border-b">
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-4 py-3">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>

            {hasNextPage && (
              <div className="flex justify-center p-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => fetchNextPage()}
                  disabled={isFetchingNextPage}
                >
                  {isFetchingNextPage ? "Loading..." : "Load more"}
                </Button>
              </div>
            )}
          </div>
        )}
      </Card>
    </div>
  );
}
