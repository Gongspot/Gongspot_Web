import DetailItem from "./DetailItem";

const chargeList = [
    { point: '-2', text: '실시간 혼잡도 기록 확인', date: '2025.05.18' },
    { point: '+2', text: '광고 시청 보상 적립', date: '2025.05.18' },
    { point: '+2', text: '광고 시청 보상 적립', date: '2025.05.15' },
];

const DetailSection = () => {
    return (
        <div>
            {chargeList.map((item, idx) => (
                <DetailItem key={idx} point={item.point} text={item.text} date={item.date} />
            ))}
        </div>
    );
};

export default DetailSection;