import { PropsWithChildren } from "react";

export default function Callout({ children }: PropsWithChildren) {
  return (
    <div className="not-prose my-8 rounded-lg border border-sage-300 bg-sage-100/70 px-5 py-4">
      <p className="eyebrow mb-1.5 text-sage-700">Worth knowing</p>
      <div className="text-[0.95rem] leading-relaxed text-sage-900">{children}</div>
    </div>
  );
}
