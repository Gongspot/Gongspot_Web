import search from '../../assets/search.svg';

const Search = () => {
    return (
        <div
            className="flex items-center border border-[#E5E5E5] rounded-[0.5rem] 
            mx-[0.813rem] mt-[0.625rem] mb-[0.625rem] px-[0.813rem] py-[0.688rem]"
        >
            <img src={search} alt="검색" />
            <input
                type="text"
                placeholder="검색"
                className="ml-[0.5rem] w-full text-[0.875rem] text-black
                outline-none placeholder:text-[#ADAEBC]"
            />
        </div>
    );
};

export default Search;