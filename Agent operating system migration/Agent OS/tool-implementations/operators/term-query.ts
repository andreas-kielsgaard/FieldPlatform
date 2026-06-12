import { runQueryOperator } from "../_lib/operators/query-runner.ts";

runQueryOperator({ operatorId: "term-query", indexIds: ["term-index"] });
