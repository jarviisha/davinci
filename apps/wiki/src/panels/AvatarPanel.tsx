import {
  Avatar,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Inline,
  Stack
} from "@jarviisha/davinci-react-ui";

export function AvatarPanel() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Avatar</CardTitle>
        <CardDescription>User identity primitive with image fallback and generated initials.</CardDescription>
      </CardHeader>
      <CardContent>
        <Stack gap="300">
          <Inline gap="150" wrap>
            <Avatar name="Ada Lovelace" size="sm" />
            <Avatar name="Grace Hopper" size="md" />
            <Avatar name="Katherine Johnson" size="lg" />
            <Avatar fallback="DS" size="xl" />
          </Inline>
          <Inline gap="150" wrap>
            <Avatar
              alt="Lin Chen"
              name="Lin Chen"
              size="lg"
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=96&q=80"
            />
            <Avatar fallback="ER" name="Elliot Reed" size="lg" src="/missing-avatar.png" />
          </Inline>
        </Stack>
      </CardContent>
    </Card>
  );
}
