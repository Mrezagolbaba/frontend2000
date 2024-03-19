import React from "react";
import ticket from "assets/scss/dashboard/ticket.module.scss";
import { useGetRepliesQuery } from "store/api/ticket";
import { useAppSelector } from "store/hooks";

export default function ReplyTicketList({
  id,
  description,
}: {
  id: string;
  description: string;
}) {
  const { firstName, lastName } = useAppSelector((state) => state.user);
  const { data, isLoading } = useGetRepliesQuery(id);
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
    </div>
  );
}
