import { iranianBankIcons } from "helpers/filesManagement/banksList";
import { useEffect, useMemo, useState } from "react";
import { useAppSelector } from "store/hooks";

type Props = {
  logoPath: string;
  id: string;
  name: string;
  website: string | null | undefined;
};

export default function RenderBankItem({ id, name, website, logoPath }: Props) {
  const { token } = useAppSelector((state) => state.auth);
  const [src, setSrc] = useState(iranianBankIcons[0].src);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    setIsFetching(true);
    const fetchImage = async () => {
      try {
        setIsFetching(false);
        // Fetch the image data from your API
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}banks/logo/${id}`,
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
      <div>
        {isFetching ? (
          <div className="placeholder-glow">
            <div
              className="placeholder rounded mt-3 py-2 w-100"
              style={{ height: "30px" }}
            />
          </div>
        ) : (
          <>
            <img width="25px" src={src} alt={name} />
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
