import {
  Badge,
  DataTable,
  Stack,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow,
  type DataTableColumn,
  type DataTableKey
} from "@jarviisha/davinci-react-ui";
import { useState } from "react";
import { PanelSection } from "../components/PanelSection";
import type { PanelMeta } from "./types";

export const tablePanelMeta: PanelMeta = {
  id: "table",
  label: "Table",
  group: "Data display",
  description: "DataTable plus composable table primitives for dense SaaS dashboard data."
};

const invoices = [
  { id: "INV-1024", customer: "Acme Inc.", status: "Paid", amount: "$2,400.00", date: "May 18, 2026" },
  { id: "INV-1025", customer: "Northstar Labs", status: "Pending", amount: "$890.00", date: "May 19, 2026" },
  { id: "INV-1026", customer: "Orbit Studio", status: "Overdue", amount: "$1,280.00", date: "May 20, 2026" }
];

type Invoice = (typeof invoices)[number];

const statusVariant = (status: string) =>
  status === "Paid" ? "success" : status === "Overdue" ? "danger" : "warning";

// One column model, reused across the DataTable demos. Header order and cell
// rendering live together, so a column can never drift out of alignment.
const invoiceColumns: DataTableColumn<Invoice>[] = [
  { key: "id", header: "Invoice", cell: (row) => <span style={{ fontWeight: 600 }}>{row.id}</span> },
  { key: "customer", header: "Customer" },
  { key: "status", header: "Status", cell: (row) => <Badge variant={statusVariant(row.status)}>{row.status}</Badge> },
  { key: "date", header: "Date" },
  { key: "amount", header: "Amount", align: "end" }
];

const notes = [
  {
    id: "INV-1024",
    note: "Customer requested a net-30 extension after the Q2 reconciliation call; finance approved pending a signed addendum."
  },
  {
    id: "INV-1025",
    note: "Auto-reminder sent twice; awaiting PO number from procurement before the balance can be released."
  }
];

const ledger = Array.from({ length: 12 }, (_, i) => ({
  id: `TXN-${4200 + i}`,
  account: ["Operating", "Payroll", "Reserve"][i % 3],
  amount: `$${(1200 + i * 137).toLocaleString()}.00`,
  date: `May ${i + 1}, 2026`
}));

const wideColumns = [
  "Invoice",
  "Customer",
  "Email",
  "Status",
  "Plan",
  "Seats",
  "Issued",
  "Due",
  "Subtotal",
  "Tax",
  "Total",
  "Owner"
];

const wideRows = [
  ["INV-1024", "Acme Inc.", "ap@acme.com", "Paid", "Enterprise", "120", "May 1, 2026", "May 31, 2026", "$2,200.00", "$200.00", "$2,400.00", "D. Okafor"],
  ["INV-1025", "Northstar Labs", "billing@northstar.io", "Pending", "Growth", "45", "May 2, 2026", "Jun 1, 2026", "$820.00", "$70.00", "$890.00", "R. Singh"],
  ["INV-1026", "Orbit Studio", "finance@orbit.studio", "Overdue", "Starter", "12", "May 3, 2026", "Jun 2, 2026", "$1,180.00", "$100.00", "$1,280.00", "M. Alvarez"]
];

export function TablePanel() {
  const [selectedId, setSelectedId] = useState("INV-1025");
  const [selectedKeys, setSelectedKeys] = useState<Set<DataTableKey>>(new Set(["INV-1025"]));

  return (
    <Stack gap="300">
      <PanelSection
        title="DataTable"
        description="The data-driven layer over the primitives: pass columns + data instead of hand-wiring TableHead/TableCell pairs. Header and cells share one column model, so they can never drift out of alignment. Presentational only — sort, filter, and paginate the data yourself before passing it in."
      >
        <DataTable
          data={invoices}
          columns={invoiceColumns}
          rowKey={(row) => row.id}
          caption="Recent invoices synced from billing."
        />
      </PanelSection>

      <PanelSection
        title="DataTable — checkbox selection"
        description="Pass selectable to add a leading checkbox column. Selection is controlled: hold the selected keys yourself and react to onSelectionChange. The header checkbox toggles all rows and shows an indeterminate state for a partial selection."
      >
        <Stack gap="200">
          <DataTable
            data={invoices}
            columns={invoiceColumns}
            rowKey={(row) => row.id}
            selectable
            selectedKeys={selectedKeys}
            onSelectionChange={setSelectedKeys}
            selectionLabel={(row) => `Select ${row.id}`}
          />
          <Badge variant="neutral">{selectedKeys.size} selected</Badge>
        </Stack>
      </PanelSection>

      <PanelSection
        title="DataTable — empty & clickable rows"
        description="empty renders in place of the body when data is empty. onRowClick makes each row interactive and fires with the row — combine it with selected styling via the primitives when you need single-select."
      >
        <Stack gap="200">
          <DataTable data={[]} columns={invoiceColumns} empty="No invoices match your filters." />
          <DataTable
            data={invoices}
            columns={invoiceColumns}
            rowKey={(row) => row.id}
            onRowClick={(row) => setSelectedId(row.id)}
          />
        </Stack>
      </PanelSection>

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
                    <Badge variant={statusVariant(invoice.status)}>{invoice.status}</Badge>
                  </TableCell>
                  <TableCell>{invoice.date}</TableCell>
                  <TableCell style={{ textAlign: "right" }}>{invoice.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </PanelSection>

      <PanelSection
        title="Wrapping cells"
        description="Cells stay on one line by default. Add the wrap prop to let long-form content flow onto multiple lines."
      >
        <TableContainer>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice</TableHead>
                <TableHead wrap>Note</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {notes.map((row) => (
                <TableRow key={row.id}>
                  <TableCell style={{ fontWeight: 600 }}>{row.id}</TableCell>
                  <TableCell wrap style={{ maxWidth: "32ch" }}>
                    {row.note}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </PanelSection>

      <PanelSection
        title="Density"
        description='density="compact" tightens vertical padding for dense data grids. Defaults to comfortable.'
      >
        <TableContainer>
          <Table density="compact">
            <TableHeader>
              <TableRow>
                <TableHead>Invoice</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Status</TableHead>
                <TableHead style={{ textAlign: "right" }}>Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell style={{ fontWeight: 600 }}>{invoice.id}</TableCell>
                  <TableCell>{invoice.customer}</TableCell>
                  <TableCell>{invoice.status}</TableCell>
                  <TableCell style={{ textAlign: "right" }}>{invoice.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </PanelSection>

      <PanelSection
        title="Sticky header"
        description="stickyHeader pins the header while the body scrolls. overlayScrollbar floats the scrollbar over the content so it reserves zero width — hover to reveal it."
      >
        <TableContainer overlayScrollbar style={{ maxHeight: "12rem" }}>
          <Table stickyHeader>
            <TableHeader>
              <TableRow>
                <TableHead>Transaction</TableHead>
                <TableHead>Account</TableHead>
                <TableHead>Date</TableHead>
                <TableHead style={{ textAlign: "right" }}>Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ledger.map((row) => (
                <TableRow key={row.id}>
                  <TableCell style={{ fontWeight: 600 }}>{row.id}</TableCell>
                  <TableCell>{row.account}</TableCell>
                  <TableCell>{row.date}</TableCell>
                  <TableCell style={{ textAlign: "right" }}>{row.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </PanelSection>

      <PanelSection
        title="Horizontal scroll"
        description="Cells stay on one line, so a wide table overflows its TableContainer and scrolls horizontally — the thin scrollbar reveals on hover. Add overlayScrollbar for a zero-space floating bar."
      >
        <TableContainer>
          <Table>
            <TableHeader>
              <TableRow>
                {wideColumns.map((col) => (
                  <TableHead key={col}>{col}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {wideRows.map((row) => (
                <TableRow key={row[0]}>
                  {row.map((cell, i) => (
                    <TableCell key={`${row[0]}-${i}`} style={i === 0 ? { fontWeight: 600 } : undefined}>
                      {cell}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </PanelSection>

      <PanelSection
        title="Borderless"
        description="borderless drops the outer frame on TableContainer for a flush, lines-only table — useful inside a Card or panel that already has a border."
      >
        <TableContainer borderless>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead style={{ textAlign: "right" }}>Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell style={{ fontWeight: 600 }}>{invoice.id}</TableCell>
                  <TableCell>{invoice.customer}</TableCell>
                  <TableCell style={{ textAlign: "right" }}>{invoice.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </PanelSection>

      <PanelSection
        title="Header tone"
        description="tone on TableHeader recolors the header. default is the subtle baseline, primary is a branded fill, neutral swaps in the base surface, and transparent drops the fill so whatever is behind the table shows through (not for use with stickyHeader — scrolling rows bleed through)."
      >
        <Stack gap="200">
          {(["primary", "neutral", "transparent"] as const).map((tone) => (
            <TableContainer key={tone}>
              <Table>
                <TableHeader tone={tone}>
                  <TableRow>
                    <TableHead>Invoice</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead style={{ textAlign: "right" }}>Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell style={{ fontWeight: 600 }}>{invoice.id}</TableCell>
                      <TableCell>{invoice.customer}</TableCell>
                      <TableCell style={{ textAlign: "right" }}>{invoice.amount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ))}
        </Stack>
      </PanelSection>

      <PanelSection
        title="Selectable rows"
        description="interactive gives a row a clickable affordance; selected highlights the current pick. They compose — click a row to select it."
      >
        <TableContainer>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead style={{ textAlign: "right" }}>Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow
                  key={invoice.id}
                  interactive
                  selected={invoice.id === selectedId}
                  onClick={() => setSelectedId(invoice.id)}
                >
                  <TableCell style={{ fontWeight: 600 }}>{invoice.id}</TableCell>
                  <TableCell>{invoice.customer}</TableCell>
                  <TableCell style={{ textAlign: "right" }}>{invoice.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </PanelSection>
    </Stack>
  );
}
