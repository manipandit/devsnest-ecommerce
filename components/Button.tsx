export default function Button({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      className="w-[456px] h-[56px] bg-black uppercase text-[#FFFFFF] font-medium flex justify-center items-center text-[16px] rounded-[6px] tracking-widest"
      onClick={onClick}
    >
      {label}
    </button>
  );
}
