<script lang="ts">
  import { t } from '$lib/translations';
  import FormLayout from '$lib/components/form/FormLayout.svelte';
  import TextInput from '$lib/components/form/TextInput.svelte';
</script>

<FormLayout
  action="/login/password"
  method="post"
  title={$t('common.auth.signIn')}
  wrapperClass="flex-1 flex flex-col justify-center"
>
  <TextInput
    label={$t('common.auth.email')}
    inputId="username"
    type="email"
    autocomplete="email"
    required
  />

  <TextInput
    label={$t('common.auth.password')}
    inputId="current-password"
    inputName="password"
    type="password"
    autocomplete="current-password"
    required
  />

  <div slot="actions">
    <button class="btn btn-primary w-full" type="submit">{$t('common.auth.signIn')}</button>
  </div>
</FormLayout>
