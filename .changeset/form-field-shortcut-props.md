---
"@jarviisha/davinci-react-ui": minor
---

Add shortcut props to `FormField` for the common label-on-top layout.

`FormField` now accepts `label`, `labelSize`, `helpText`, and `errorText` props. When provided, FormField renders the corresponding child components in fixed order (label → control → help → error) inside its existing context provider, so id / aria wiring still works:

```tsx
<FormField label="Email" helpText="Use work email" required>
  <Input type="email" />
</FormField>
```

The composition API (`<Label>` / `<FormHelpText>` / `<FormErrorText>` as children) is unchanged and remains the right choice when the layout needs icons, custom slots, or non-standard ordering. Mixing the shortcut props with the corresponding composed child is not handled — pick one style per FormField.
