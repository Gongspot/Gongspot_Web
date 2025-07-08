import ChargeItem from "./ChargeItem";

const chargeList = [
    { point: 2, price: '200원' },
    { point: 10, price: '1,000원' },
    { point: 20, price: '2,000원' },
    { point: 50, price: '5,000원' },
];

const ChargeSection = () => {
    return (
        <div>
            {chargeList.map((item) => (
                <ChargeItem key={item.point} point={item.point} price={item.price} />
            ))}
        </div>
    );
};

export default ChargeSection;