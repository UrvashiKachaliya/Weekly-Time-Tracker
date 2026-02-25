import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function WeeklyTimeTracker() {
  // Constants (most common company policy: full day leave = 8:30)
  const WEEKLY_TARGET_MINUTES = 42 * 60; // 2520 minutes
  const FULL_DAY_MINUTES = 8 * 60 + 30; // 510 min
  const HALF_DAY_MINUTES = 4 * 60 + 30; // 270 min
  const PARTIAL_DAY_WORKED_MINUTES = 6 * 60 + 30; // 390 min (worked)

  const [weekData, setWeekData] = useState([
    { day: "Mon", time: "", leave: "none" },
    { day: "Tue", time: "", leave: "none" },
    { day: "Wed", time: "", leave: "none" },
    { day: "Thu", time: "", leave: "none" },
    { day: "Fri", time: "", leave: "none" },
  ]);

  const convertToMinutes = (timeStr) => {
    if (!timeStr || !timeStr.includes(":")) return 0;
    const [h, m] = timeStr.split(":").map(Number);
    return (h || 0) * 60 + (m || 0);
  };

  const formatMinutes = (totalMin) => {
    if (totalMin <= 0) return "00:00";
    const h = Math.floor(totalMin / 60);
    const m = totalMin % 60;
    return `${h}:${m.toString().padStart(2, "0")}`;
  };

  const handleTimeChange = (index, value) => {
    const updated = [...weekData];
    updated[index].time = value;
    setWeekData(updated);
  };

  const handleLeaveChange = (index, value) => {
    const updated = [...weekData];
    updated[index].leave = value;

    if (value === "full") {
      updated[index].time = "08:30"; // displayed but not counted as worked
    } else if (value === "half") {
      updated[index].time = "04:30";
    } else if (value === "partial") {
      updated[index].time = "06:30";
    } else if (value === "none") {
      updated[index].time = "";
    }

    setWeekData(updated);
  };

  const fullCount = weekData.filter((d) => d.leave === "full").length;
  const halfCount = weekData.filter((d) => d.leave === "half").length;
  const partialCount = weekData.filter((d) => d.leave === "partial").length;

  const deductedMinutes =
    fullCount * FULL_DAY_MINUTES +
    halfCount * HALF_DAY_MINUTES +
    partialCount * (FULL_DAY_MINUTES - PARTIAL_DAY_WORKED_MINUTES);

  // Required minutes after leave deductions
  const requiredMinutes = WEEKLY_TARGET_MINUTES - deductedMinutes;

  // Total actually worked minutes
  const totalMinutes = weekData.reduce((sum, day) => {
    if (day.leave === "full") return sum + 0;
    if (day.leave === "half") return sum + HALF_DAY_MINUTES;
    if (day.leave === "partial") return sum + PARTIAL_DAY_WORKED_MINUTES;
    return sum + convertToMinutes(day.time);
  }, 0);

  const remainingMinutes = Math.max(0, requiredMinutes - totalMinutes);
  const progress =
    requiredMinutes > 0 ? (totalMinutes / requiredMinutes) * 100 : 100;

  return (
    <div className="flex justify-center items-center min-h-screen bg-muted/40 p-6">
      <Card className="w-[750px] shadow-xl rounded-2xl">
        <CardHeader className="text-center space-y-2 mt-3">
          <CardTitle className="text-[25px] font-bold">
            Weekly Time Tracker
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6 mt-3">
          {/* Table Header */}
          <div className="grid grid-cols-3 text-sm font-semibold text-muted-foreground  text-center border-b border-[#c5c6c7]">
            <div>Day</div>
            <div>Worked Hours</div>
            <div>Leave</div>
          </div>

          {/* Rows */}
          <div className="space-y-3">
            {weekData.map((item, index) => (
              <div
                key={item.day}
                className="grid grid-cols-3 items-center text-center py-2 border-b border-[#c5c6c7] last:border-none"
              >
                <div className="font-medium">{item.day}</div>

                <div className="flex justify-center">
                  <Input
                    type="text"
                    value={weekData[index].time}
                    placeholder="08:30"
                    className="w-[110px] text-center"
                    disabled={weekData[index].leave !== "none"}
                    onChange={(e) => {
                      let val = e.target.value;

                      // Ensure it starts with "08:"
                      if (!val.startsWith("08:")) val = "08:";

                      // Only allow 2 digits for minutes
                      const minutesPart = val
                        .slice(3)
                        .replace(/\D/g, "")
                        .slice(0, 2);

                      handleTimeChange(index, `08:${minutesPart}`);
                    }}
                  />
                </div>

                <div className="flex justify-center">
                  <Select
                    value={weekData[index].leave}
                    onValueChange={(val) => handleLeaveChange(index, val)}
                  >
                    <SelectTrigger className="w-[150px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem
                        value="partial"
                        disabled={
                          partialCount >= 1 &&
                          weekData[index].leave !== "partial"
                        }
                      >
                        Partial
                      </SelectItem>
                      <SelectItem
                        value="half"
                        disabled={
                          halfCount >= 5 && weekData[index].leave !== "half"
                        }
                      >
                        Half day
                      </SelectItem>
                      <SelectItem
                        value="full"
                        disabled={
                          fullCount >= 5 && weekData[index].leave !== "full"
                        }
                      >
                        Full day
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="space-y-4 ">
            {/* <Progress
              value={Math.min(progress, 100)}
              className="h-3 rounded-full"
            /> */}

            <div className="bg-muted/40 rounded-xl py-2 px-5 text-sm">
              <div className="flex justify-between">
                <span>
                  Adjusted Weekly Target Hours Required (after leaves)
                </span>
                <span className="text-primary font-semibold">
                  {formatMinutes(requiredMinutes)}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Total Worked</span>
                <span className="font-semibold">
                  {formatMinutes(totalMinutes)} /{" "}
                  {formatMinutes(requiredMinutes)}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Remaining</span>
                <span className="font-medium">
                  {remainingMinutes > 0 ? formatMinutes(remainingMinutes) : "—"}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Status</span>
                <span
                  className={
                    remainingMinutes > 0
                      ? "text-orange-600 font-medium"
                      : "text-green-600 font-medium"
                  }
                >
                  {remainingMinutes > 0 ? "⚠ Pending" : "✔ Completed"}
                </span>
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="justify-center py-2">
          <Button
            variant="outline"
            onClick={() =>
              setWeekData(
                weekData.map((d) => ({ ...d, time: "", leave: "none" })),
              )
            }
          >
            Reset Week
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
