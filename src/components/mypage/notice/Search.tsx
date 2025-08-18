import search from '../../../assets/search.svg';

interface SearchProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Search = ({ value, onChange }: SearchProps) => {
    return (
        <div
            className="flex items-center border border-[#E5E5E5] rounded-[0.5rem] 
            w-full px-[0.813rem] py-[0.688rem]"
        >
            <img src={search} alt="검색" />
            <input
                type="text"
                placeholder="검색"
                value={value}
                onChange={onChange}
                className="ml-[0.5rem] w-full text-[0.875rem] text-black
                outline-none placeholder:text-[#ADAEBC]"
            />
        </div>
    );
};

export default Search;