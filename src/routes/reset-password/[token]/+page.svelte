<script lang="ts">
  import FormLayout from '$lib/components/form/FormLayout.svelte';
  import TextInput from '$lib/components/form/TextInput.svelte';
  import { globalConfig } from '$lib/config/globalConfig.js';
  import { t } from '$lib/translations';
  import { getTranslatedFormErrors, updateFormData } from '$lib/ts/formUtils/formUtilsClient.js';
  import type { FormParseData } from '$lib/ts/formUtils/types.js';
  import { validatePasswordFormat } from '$lib/ts/formUtils/userValidation/validateClient.js';

  export let form;

  let password = '';

  $: wrapAndUpdateFormData(form?.data);
  $: formErrors = getTranslatedFormErrors(form?.errors, $t);

  $: passwordValid = validatePasswordFormat(password);

  function wrapAndUpdateFormData(formData: FormParseData | undefined) {
    ({ password } = updateFormData({ password }, formData));
  }
</script>

<FormLayout
  method="post"
  title={$t('common.auth.resetPassword')}
  wrapperClass="flex-1 flex flex-col justify-center"
>
  <TextInput
    bind:value={password}
    error={formErrors['password']}
    errorHighlight={password.length > 0 && !passwordValid}
    label={$t('common.auth.passwordNew')}
    info={$t('common.auth.passwordHint', { s1: globalConfig.user.passwordMinLength.toString() })}
    inputId="password"
    type="password"
    required
  />

  <div slot="actions">
    <button type="submit" class="btn btn-primary w-full">
      {$t('common.auth.resetPassword')}
    </button>
  </div>
</FormLayout>
