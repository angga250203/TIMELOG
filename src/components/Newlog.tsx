"use client";

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { IoMdAdd } from "react-icons/io";
import { DatePicker } from "./Datepicker";
import { useLogStore } from "./hooks";
import { useToast } from "@/components/ui/use-toast"
import dayjs from "dayjs";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";




export function Newlog() {

  const log = useLogStore ((state) => state.log);
  const setLog = useLogStore ((state) => state.setLog);
  const setLogs = useLogStore ((state) => state.setLogs);

  const supabase = createClientComponentClient();

  

  const { toast } = useToast()

  const validateLog = () => {
    if (!log.date || !log.hour || log.hour === 0){

      throw "date or hour can not be empety"

    }else if (log.hour >= 24){
      throw "please enter valid hours"
    }
  };

  const closeDialog  = () => {
    document.getElementById("close-btn")?.click();
  }

  const submitLog  = async() => {
    try {

      validateLog();

      const date = log.date as Date;
      const {error} = await supabase
      .from("logs")
      .upsert({...log,date:dayjs(log.date).format("YYYY-MM-DD")})
      .select("*")
      .single();

      if(!error){

     

      setLogs(log, dayjs(date).format("YYYY-MM-DD"));

      toast ({
        title: "Succesfully create log",
        description: `${log.hour} hour in ${date.toDateString()}`,
      })

      closeDialog();

    }else{
      toast ({

        variant:"destructive",
        title: "Scheduled: Catch up",
        description: error.message,
      })
    }
      

    } catch (e) {
      toast ({

        variant:"destructive",
        title: "Scheduled: Catch up",
        description: "Friday, February 10, 2023 at 5:57 PM",
      })
    }
  }



  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="mt-16"><IoMdAdd className="text-3xl font-bold"/></Button>
      </DialogTrigger>
      <DialogContent className="max-w-[23rem] rounded-lg lg:max-w-xl mx-auto">
        <DialogHeader>
          <DialogTitle>Create New Log</DialogTitle>
          <DialogDescription>
           Lorem ipsum dolor, sit amet consectetur adipisicing elit. Debitis quibusdam modi architecto?
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="hours" className="text-right">
              Date
            </Label>
           <DatePicker/>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="hours" className="text-right">
              Hours
            </Label>
            <Input
              id="hours"
                type="number"
              className="col-span-3" 
              value={log.hour}
              onChange={(e) => setLog({
                ...log, hour:parseInt(e.target.value)
              })}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="noted" className="text-right">
              Noted
            </Label>
            <Input
              id="Noted"
              placeholder="input your noted"
              className="col-span-3"
              value={log.note}
              onChange={(e) => setLog({
                ...log,note:e.target.value
              })}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" 
          onClick={submitLog}
          >Create Timelog</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
