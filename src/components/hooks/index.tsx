import { create } from 'zustand'


export type Ilog = {
    hour:number,
    note:string,
    date:Date | string,
}

interface LogState {
    log:Ilog,
    logs: {
		[key: string]: Ilog;
	};
    setLog: (log: Ilog) => void;
    setDate: (date: Date) => void;
    setLogs: (log: Ilog, key: string) => void;
    
}

export const useLogStore = create<LogState>()((set) => ({
  log:{
    note: "",
    hour: 0,
    date: new Date(),
    
  },
  logs:{},
  setDate:(date:Date) => set((state) =>({log : {...state.log,date}})),
  setLog:(log:Ilog) => set((state) => ({ log : {...state.log, ...log}})),
  setLogs:(log:Ilog, key:string) => 
    set((state) => {
      
      const updateLog = {...state.logs,[key]:log};
      const sortedKeys = Object.keys(updateLog).sort();

      const sortObject:{
        [key: string]: Ilog;
      }={};

      for(const key of sortedKeys) {
        sortObject[key] = updateLog[key];
      }

      return {logs :sortObject};
      
    
})



}))