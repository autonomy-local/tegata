import { getPerformance, trace } from "firebase/performance";
import type { PerformanceTrace } from "firebase/performance";
import { firebaseApp } from "../service/firebase";

const perf = getPerformance(firebaseApp);

export function performanceTrace(customTraceName: string): PerformanceTrace {
	return trace(perf, customTraceName);
}
