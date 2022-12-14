<script lang="ts">
  import { userInformationStore } from "../../../stores/loginStore";
</script>

<h1>Hello, {$userInformationStore.name}</h1>

<p>Your birthdate is {$userInformationStore.birthdate}</p>
<p>Your email address is {$userInformationStore.email}</p>
