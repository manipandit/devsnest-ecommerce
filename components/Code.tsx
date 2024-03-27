interface CodeProps {
  value: string;
  onChange: (newValue: string) => void;
}

export default function Code({ value, onChange }: CodeProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value.slice(0, 1);
    onChange(newValue);
  };
  return (
    <input
      type="text"
      maxLength={1}
      className=" appearance-none w-full flex justify-center items-center pt-2 h-[48px] rounded-[6px] border border-[#C1C1C1] px-4"
      onChange={handleChange}
    />
  );
}
