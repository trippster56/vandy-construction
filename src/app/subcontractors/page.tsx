import { redirect } from "next/navigation";

/**
 * Shareable alias for the subcontractor form — Josh can hand out
 * vandyconstruction.com/subcontractors instead of a query string.
 * No duplicate page: it lands on /contact with the subcontractor tab open.
 */
export default function SubcontractorsPage() {
  redirect("/contact?for=subcontractor");
}
