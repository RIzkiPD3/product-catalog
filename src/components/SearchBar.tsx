interface Props {
    value: string;
    onChange: (value: string) => void;
  }
  
  export default function SearchBar({ value, onChange }: Props) {
    return (
      <div className="w-full flex justify-center my-5">
        <input
          type="text"
          placeholder="Cari produk..."
          className="w-3/5 md:w-1/2 px-4 py-2 rounded-xl border border-gray-300 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    );
  }
  