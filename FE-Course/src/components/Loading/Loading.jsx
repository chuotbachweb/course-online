function Loading() {
  return (
   <div className="fixed inset-0 w-full flex justify-center items-center ">
      <div className="bg-white w-1/2 flex justify-center items-center animate-pulse gap-2 p-4">
        <div className="h-12 w-12 rounded-full bg-slate-400"></div>
        <div className="flex-1">
          <div className="mb-1 h-5 w-3/5 rounded-lg bg-slate-400 text-lg"></div>
          <div className="h-5 w-[90%] rounded-lg bg-slate-400 text-sm"></div>
        </div>
        <div className="absolute bottom-5 right-0 h-4 w-4 rounded-full bg-slate-400"></div>
      </div>
   </div>
  );
}

export default Loading;
