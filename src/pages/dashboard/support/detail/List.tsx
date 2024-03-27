import arsonexLogo from "assets/img/favicon.png";
import { useAppSelector } from "store/hooks";
import { useGetRepliesQuery } from "store/api/ticket";

import ticket from "assets/scss/dashboard/ticket.module.scss";

export default function ReplyTicketList({
  id,
  description,
}: {
  id: string;
  description: string;
}) {
  const { firstName, lastName } = useAppSelector((state) => state.user);
  const { data, isLoading } = useGetRepliesQuery(id);

  const checkWriter = (reply) => {
    if (reply.adminId) return "ADMIN";
    else return "USER";
  };
  return (
    <div>
      <div className={ticket.comment}>
        <div className={ticket.comment__body}>
          <div className={ticket.comment__header}>
            <div className={ticket["comment-meta"]}>
              <span className={ticket["comment-meta-prof"]}>
                {firstName[0]}
              </span>
              <span>{`${firstName} ${lastName}: `}</span>
            </div>
          </div>
          <p className={ticket.comment__text}>{description}</p>
        </div>
      </div>
      {data &&
        data.map((t, key) => (
          <div className={ticket.comment} key={key}>
            <div
              className={`${ticket.comment__body} ${checkWriter(t.reply) === "ADMIN" ? ticket.answer : ""}`}
            >
              <div className={ticket.comment__header}>
                <div className={ticket["comment-meta"]}>
                  <span className={ticket["comment-meta-prof"]}>
                    {checkWriter(t.reply) === "ADMIN" ? (
                      <img src={arsonexLogo} alt="arsonex-logo" />
                    ) : (
                      firstName[0]
                    )}
                  </span>
                  <span>
                    {checkWriter(t.reply) === "ADMIN"
                      ? "اپراتور پشتیبانی"
                      : `${firstName} ${lastName}: `}
                  </span>
                </div>
              </div>
              <p className={ticket.comment__text}>{t.reply.content}</p>
            </div>
          </div>
        ))}
    </div>
  );
}
