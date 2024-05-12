export default function Button({
  label,
  onClick,
  pending,
}: {
  label: string;
  onClick?: () => void;
  pending?: boolean;
}) {
  return (
    <button
      className="w-[456px] h-[56px] bg-black uppercase text-[#FFFFFF] font-medium flex justify-center items-center text-[16px] rounded-[6px] tracking-widest disabled:opacity-60 "
      onClick={onClick}
      disabled={pending}
    >
      {label}
    </button>
  );
}
