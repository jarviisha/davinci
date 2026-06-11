import { useRadiusPreset, useTheme } from "@jarviisha/davinci-react-theme-provider";
import { Stack } from "@jarviisha/davinci-react-ui";
import { PanelHeader } from "./components/PanelHeader";
import { WikiSidebar } from "./components/WikiSidebar";
import { useFontPreset } from "./hooks/useFontPreset";
import { useHashRoute } from "./hooks/useHashRoute";
import { themeTokenEntries } from "./lib/tokens";
import { DEFAULT_PANEL_ID, findPanel, panelGroups, panelIds } from "./panels/registry";

const SEMANTIC_PREFIX = "semantic.color.";

export default function App() {
  const { resolvedTheme } = useTheme();
  const [activeId, navigate] = useHashRoute(panelIds, DEFAULT_PANEL_ID);
  const [fontPreset, setFontPreset] = useFontPreset();
  const [radiusValue, setRadiusValue] = useRadiusPreset();

  const semanticEntries = themeTokenEntries(resolvedTheme).filter(
    (token) => token.name.startsWith(SEMANTIC_PREFIX) && !token.name.endsWith("Foreground")
  );

  const activePanel = findPanel(activeId) ?? findPanel(DEFAULT_PANEL_ID);

  return (
    <main className="min-h-screen bg-surface font-sans text-foreground">
      <WikiSidebar
        activeId={activeId}
        fontPreset={fontPreset}
        groups={panelGroups}
        onFontPresetChange={setFontPreset}
        onNavigate={navigate}
        onRadiusChange={setRadiusValue}
        radiusValue={radiusValue}
      />

      <section className="min-w-0 px-6 py-6 lg:ml-80 lg:px-8 lg:py-8">
        <div className="mx-auto w-full max-w-5xl">
          <Stack gap="300">
            {activePanel ? (
              <>
                <PanelHeader
                  description={activePanel.description}
                  label={activePanel.label}
                  resolvedTheme={resolvedTheme}
                />
                {activePanel.render({
                  resolvedTheme,
                  semanticEntries,
                  semanticPrefix: SEMANTIC_PREFIX
                })}
              </>
            ) : null}
          </Stack>
        </div>
      </section>
    </main>
  );
}
