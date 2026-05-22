import {
  Badge,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow
} from "@jarviisha/davinci-react-ui";
import { PanelSection } from "../components/PanelSection";
import type { PanelMeta } from "./types";

export const tablePanelMeta: PanelMeta = {
  id: "table",
  label: "Table",
  group: "Data display",
  description: "Composable table primitives for dense SaaS dashboard data."
};

const invoices = [
  { id: "INV-1024", customer: "Acme Inc.", status: "Paid", amount: "$2,400.00", date: "May 18, 2026" },
  { id: "INV-1025", customer: "Northstar Labs", status: "Pending", amount: "$890.00", date: "May 19, 2026" },
  { id: "INV-1026", customer: "Orbit Studio", status: "Overdue", amount: "$1,280.00", date: "May 20, 2026" }
];

export function TablePanel() {
  return (
    <PanelSection title="Table" description="Composable table primitives for dense dashboard data.">
      <TableContainer>
        <Table>
          <TableCaption>Recent invoices synced from billing.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead style={{ textAlign: "right" }}>Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell style={{ fontWeight: 600 }}>{invoice.id}</TableCell>
                <TableCell>{invoice.customer}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      invoice.status === "Paid"
                        ? "success"
                        : invoice.status === "Overdue"
                          ? "destructive"
                          : "warning"
                    }
                  >
                    {invoice.status}
                  </Badge>
                </TableCell>
                <TableCell>{invoice.date}</TableCell>
                <TableCell style={{ textAlign: "right" }}>{invoice.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </PanelSection>
  );
}
