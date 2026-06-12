import { runQueryOperator } from "../_lib/operators/query-runner.ts";

runQueryOperator({ operatorId: "pattern-candidate-query", indexIds: ["component-index", "literal-index", "term-index"] });
