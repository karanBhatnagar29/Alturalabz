import { Progress } from "@/components/ui/progress";
export default function Loading() {
  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <Progress value={33} />;
      </div>
    </>
  );
}
