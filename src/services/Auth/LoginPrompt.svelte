<script>
	let user = {};
	
	const login = () => {
		user.loggedIn = !user.loggedIn;
	}
	
</script>

<style>
	#loginPrompt {
		display: flex;
		flex-direction: column;
		width: 80%;
		border: solid 1px black;
		padding: 15px;
	}
	
	#loginPrompt * {
		width: 100%;
	}
</style>



<article id="loginPrompt">
	{#if !user.loggedIn}
		<section>
			<input placeholder='email' bind:value={user.email}>
			<input placeholder='password' type='password' bind:value={user.password}>
		</section>
	{/if}
	<section>
		{#if user.loggedIn}
			<button on:click={login}>
				Log out
			</button>
		{:else}
			<button on:click={login}>
				Log in
			</button>
		{/if}
	</section>
	
</article>