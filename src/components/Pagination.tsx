const Pagination = () => {
  return (
    <div className="p-4 flex items-center justify-between">
      <button
        disabled
        className="py-2 px-4 rounded-md bg-[#B4B4B4] text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Назад
      </button>
      <div className="flex items-center gap-2 text-sm">
        <button className="px-2 rounded-sm bg-[#B3E2FD]">1</button>
        <button className="px-2 rounded-sm ">2</button>
        <button className="px-2 rounded-sm ">3</button>
        ...
        <button className="px-2 rounded-sm ">10</button>
      </div>
      <button className="py-2 px-4 rounded-md bg-[#D9D9D9] text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed">
        Дальше
      </button>
    </div>
  );
};

export default Pagination;
