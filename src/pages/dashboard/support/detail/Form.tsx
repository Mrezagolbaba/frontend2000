import { isEmpty } from "lodash";
import { useState } from "react";
import { Button, Form, FormGroup, Input, Spinner } from "reactstrap";
import { useReplyTicketMutation } from "store/api/ticket";

export default function ReplyTicketForm({ id }: { id: string }) {
  const [reply, setReply] = useState("");
  const [request, { isLoading }] = useReplyTicketMutation();

  const handleSubmit = () => {
    if (!isEmpty(reply)) request({ ticketId: id, content: reply });
  };

  return (
    <Form>
      <FormGroup>
        <Input
          type="textarea"
          id="review_text"
          placeholder="پاسخ خود را در این قسمت بنویسید"
          style={{ height: "100px" }}
          disabled={isLoading}
          onChange={({ target }) => setReply(target.value)}
        />
      </FormGroup>
      <div className="mt-4" style={{ textAlign: "left" }}>
        <Button
          color="primary"
          disabled={isLoading}
          className="px-5 py-3"
          outline
          onClick={handleSubmit}
        >
          {isLoading ? <Spinner /> : "ارسال پاسخ"}
        </Button>
      </div>
    </Form>
  );
}

ReplyTicketForm;
