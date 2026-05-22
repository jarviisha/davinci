import { useMemo, useState } from "react";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  EmptyState,
  Inline,
  SearchInput,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow
} from "@jarviisha/davinci-react-ui";
import { accounts, healthVariant, type AccountHealth } from "../data/dashboard";

type HealthFilter = "all" | "Healthy" | "Watch" | "At risk";

const healthOptions: { value: HealthFilter; label: string }[] = [
  { value: "all", label: "All health" },
  { value: "Healthy", label: "Healthy" },
  { value: "Watch", label: "Watch" },
  { value: "At risk", label: "At risk" }
];

export default function AccountsRoute() {
  const [query, setQuery] = useState("");
  const [healthFilter, setHealthFilter] = useState<HealthFilter>("all");

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return accounts.filter((account) => {
      const matchesQuery =
        !normalized ||
        account.name.toLowerCase().includes(normalized) ||
        account.owner.toLowerCase().includes(normalized);
      const matchesHealth = healthFilter === "all" || account.health === healthFilter;
      return matchesQuery && matchesHealth;
    });
  }, [healthFilter, query]);

  return (
    <Card variant="filled">
      <CardHeader>
        <Inline align="start" justify="between" wrap>
          <div>
            <CardTitle>Account health</CardTitle>
            <CardDescription>Prioritized customer accounts for the revenue team.</CardDescription>
          </div>
          <Inline gap="150" wrap>
            <SearchInput
              aria-label="Search accounts"
              onChange={(event) => setQuery(event.currentTarget.value)}
              placeholder="Search accounts"
              size="sm"
              value={query}
            />
            <Select
              aria-label="Health filter"
              onChange={(event) => setHealthFilter(event.currentTarget.value as HealthFilter)}
              size="sm"
              value={healthFilter}
            >
              {healthOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </Inline>
        </Inline>
      </CardHeader>
      <CardContent>
        {filtered.length === 0 ? (
          <EmptyState
            actions={
              <Button
                onClick={() => {
                  setQuery("");
                  setHealthFilter("all");
                }}
                size="sm"
                tone="neutral"
                variant="outline"
              >
                Reset filters
              </Button>
            }
            description="Try clearing search or switching the health filter."
            title="No accounts match these filters"
          />
        ) : (
          <Stack gap="200">
            <TableContainer>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Account</TableHead>
                    <TableHead>Plan</TableHead>
                    <TableHead>Owner</TableHead>
                    <TableHead className="text-right">MRR</TableHead>
                    <TableHead>Health</TableHead>
                    <TableHead className="text-right">Usage</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((account) => (
                    <TableRow key={account.name}>
                      <TableCell>
                        <span className="font-medium">{account.name}</span>
                      </TableCell>
                      <TableCell>{account.plan}</TableCell>
                      <TableCell>{account.owner}</TableCell>
                      <TableCell className="text-right font-medium">{account.mrr}</TableCell>
                      <TableCell>
                        <Badge variant={healthVariant(account.health)}>{account.health}</Badge>
                      </TableCell>
                      <TableCell className="text-right">{account.usage}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Inline align="center" justify="between">
              <span className="text-sm text-text-subtle">
                Showing {filtered.length} of {accounts.length} accounts
              </span>
              <Badge variant="neutral">{summarizeHealth(filtered.map((a) => a.health))}</Badge>
            </Inline>
          </Stack>
        )}
      </CardContent>
    </Card>
  );
}

function summarizeHealth(values: AccountHealth[]) {
  const healthy = values.filter((v) => v === "Healthy").length;
  const watch = values.filter((v) => v === "Watch").length;
  const risk = values.filter((v) => v === "At risk").length;
  return `${healthy} healthy · ${watch} watch · ${risk} at risk`;
}
