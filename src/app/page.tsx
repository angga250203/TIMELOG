
import { Calender } from "@/components/calender";
import { Ilog } from "@/components/hooks";
import { Navbar } from "@/components/Navbar";
import { Newlog } from "@/components/Newlog";
import InitLog from "@/components/state/initlog";
import { TableShow } from "@/components/table";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";


export default async function Home() {

  const supabase = createServerComponentClient({cookies});

  const {data} = await supabase.auth.getSession();
  

  if(!data.session){
    return redirect("/auth")
  }

  const {data: logs} = await supabase
  .from("logs")
  .select("*")
  .order("date",{ ascending:true});

  return (
    <>
    <InitLog logs={logs as Ilog[]}/>
     <Navbar/>
     <Newlog/>
     <Calender/>
     <TableShow/>
    </>
  );
}
