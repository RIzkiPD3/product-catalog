interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function CategoryFilter({ value, onChange }: Props) {
  return (
    <div className="w-full flex justify-center mt-4">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-3/5 md:w-1/2 px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition cursor-pointer"
      >
        <option value="all">All</option>
        <option value="electronics">Electronics</option>
        <option value="jewelery">Jewelery</option>
        <option value="men's clothing">Men’s Clothing</option>
        <option value="women's clothing">Women’s Clothing</option>
      </select>
    </div>
  );
}
