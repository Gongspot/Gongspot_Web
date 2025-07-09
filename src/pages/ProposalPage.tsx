import TopHeader from "../components/TopHeader";
import ProposalForm from "../components/space/ProposalForm";

const ProposalPage = () => {
  return (
    <div className="flex flex-col h-screen bg-[#EFF7FB]">
      <TopHeader title="새 공간 등록 신청" backButton={true} />
      <div className="flex flex-col h-full mt-[3.5rem] mb-[2.875rem] mx-[1.25rem] 
        bg-white border border-[#B1B8C180] rounded-[0.313rem]">
        <ProposalForm />
      </div>
    </div>
  );
};

export default ProposalPage;