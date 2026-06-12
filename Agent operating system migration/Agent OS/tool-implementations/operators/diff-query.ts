import { runQueryOperator } from "../_lib/operators/query-runner.ts";

runQueryOperator({ operatorId: "diff-query", indexIds: ["change-index"] });
