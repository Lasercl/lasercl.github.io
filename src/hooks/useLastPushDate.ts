import { useEffect, useState } from "react";

export function useLastPushDate(apiUrl: string) {
  const [date, setDate] = useState("-");

  useEffect(() => {
    let cancelled = false;

    fetch(apiUrl)
      .then((res) => res.json())
      .then((json) => {
        if (cancelled) return;
        const pushed = new Date(json.pushed_at);
        setDate(
          isNaN(pushed.getTime())
            ? "-"
            : pushed.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })
        );
      })
      .catch(() => {
        if (!cancelled) setDate("-");
      });

    return () => {
      cancelled = true;
    };
  }, [apiUrl]);

  return date;
}
