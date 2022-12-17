<script lang="ts">
  import { userInformation$ } from "../../../stores/loginStore";
</script>

<h1>Hello, {$userInformation$.name}</h1>

<p>Your birthdate is {$userInformation$.birthdate}</p>
<p>Your email address is {$userInformation$.email}</p>
