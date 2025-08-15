import NoticeEditor from "../../../components/admin/notice/NoticeEditor";

interface Props {
  form: { title: string; category: string; content: string };
  attachments: File[] | null;
  onChange: (key: string, value: string) => void;
  onFileChange: (files: File[] | null) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const NoticeEditView = ({ form, attachments, onChange, onFileChange, onSubmit }: Props) => {
  return (
    <NoticeEditor
      navTitle="공지사항 수정"
      form={form}
      onChange={onChange}
      attachments={attachments}
      onFileChange={onFileChange}
      onSubmit={onSubmit}
      submitText="저장하기"
      isCategoryEditable={false}
    />
  );
};

export default NoticeEditView;