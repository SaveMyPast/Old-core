<script>
  import { userInformationStore } from "../../../stores/loginStore.ts";
</script>

<h1>Hello, {$userInformationStore.name}</h1>

<p>Your birthdate is {$userInformationStore.birthdate}</p>
<p>Your email address is {$userInformationStore.email}</p>
