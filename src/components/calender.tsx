"use client";

import React from 'react';
import dayjs from 'dayjs';
import { cn } from "@/lib/utils";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useLogStore } from './hooks';

export const Calender: React.FC = () => {

    const logs = useLogStore((state) => state.logs);

    function getDateInMount(year = dayjs().year(), month = dayjs().month()): string[] {
        const startDate = dayjs().year(year).month(month).date(1);
        const endDate = startDate.endOf("month");

        const dateArray: string[] = [];

        for (let i = startDate.date(); i <= endDate.date(); i++) {
            dateArray.push(startDate.date(i).format("YYYY-MM-DD"));
        }

        return dateArray;
    };

    const getColor = (value: number): string => {
        if (value === 0) {
            return "bg-gray-100";
        } else if (value < 5) {
            return "bg-green-200";
        } else if (value < 10) {
            return "bg-green-400";
        } else {
            return "bg-green-500";
        }
    }

    return (
        <div className='border-2 rounded-xl py-12 px-8 my-12 flex flex-wrap gap-3 justify-center'>
            {getDateInMount().map((value, index) => {
                const log = logs[value];

                return (
                    <HoverCard key={index}>
                        <HoverCardTrigger>
                            <div className={cn("w-7 h-7 cursor-pointer rounded-sm", getColor(log?.hour || 0))}></div>
                        </HoverCardTrigger>
                        <HoverCardContent>
                            {log?.hour || 0} hours on {value}
                        </HoverCardContent>
                    </HoverCard>
                )
            })}
        </div>
    )
}
