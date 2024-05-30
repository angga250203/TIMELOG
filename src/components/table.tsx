"use client";

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { useLogStore } from "./hooks"
  
  
  export function TableShow() {

    const logs = useLogStore((state) => state.logs )
    

    return (
        <Table>
        <TableCaption className="mt-24">A list of Log Time </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/3">Date</TableHead>
            <TableHead className="w-1/3">Hours</TableHead>
            <TableHead className="w-1/3">Noted</TableHead>
        
          </TableRow>
        </TableHeader>
        <TableBody>

        {Object.keys(logs).map((key) => {
          const log = logs[key];
          const date = log.date as Date
          return(
            <TableRow key={key}>
            <TableCell >{date.toDateString()}</TableCell>
            <TableCell>{log.hour}</TableCell>
            <TableCell>{log.note}</TableCell>
            
          </TableRow>
          )
        })}

          
        </TableBody>
      </Table>
      
    )
  }
  