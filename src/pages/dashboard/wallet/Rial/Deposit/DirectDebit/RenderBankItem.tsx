import { useEffect, useMemo, useState } from "react";
import { useAppSelector } from "store/hooks";
import bankDefault from "assets/img/icons/bankDefault.svg";

type Props = {
  logoPath: string;
  id: string;
  name: string;
  website: string | null | undefined;
};

export default function RenderBankItem({ id, name, website, logoPath }: Props) {
  const { token } = useAppSelector((state) => state.auth);
  const [src, setSrc] = useState(bankDefault);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    setIsFetching(true);
    const fetchImage = async () => {
      try {
        setIsFetching(false);
        // Fetch the image data from your API
        const response = await fetch(
          `${"https://dev-api.paydirham.me/v1/"}banks/logo/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        if (response.ok) {
          const imageData = await response.blob();

          setSrc(URL.createObjectURL(imageData));
        }
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };
    fetchImage();
  }, [id, logoPath, token]);

  return useMemo(
    () => (
      <div className="flex">
        {isFetching ? (
          <div className="placeholder-glow">
            <div
              className="placeholder w-100 mt-3 rounded py-2"
              style={{ height: "30px" }}
            />
          </div>
        ) : (
          <>
            <img
              width="20"
              height="20"
              src={src}
              alt={name}
              style={{
                objectFit: "contain",
              }}
            />
            <span className="mx-2">{website}</span>
          </>
        )}
      </div>
    ),
    [name, src, website],
  );
}
function setIsFetching(arg0: boolean) {
  throw new Error("Function not implemented.");
}
