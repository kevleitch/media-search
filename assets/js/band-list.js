Vue.component('band-list', {
	props: ['results'],
	template: `
		<section>
			<div class="" v-for="result in results">
				<div class="card">
					<div class="card-title">
						<h3>{{ result.Name }}</h3>
					</div>
					<div class="card-text">
						<p><iframe width="280" :src="result.yUrl" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>{{ result.wTeaser }}.</p>
						<div class="text-right">
							<a class="btn btn-warning" :href="result.wUrl" target="_blank">Source</a>
						</div>
					</div>
				</div>
			</div>
		</section>
		
	`
})

Vue.component('original-result', {
	props: ['orig'],
	template: `
		<section>
			<div class="orig-result" v-for="ori in orig">
				<h1>You Searched For</h1>
				<div class="card">
					<div class="card-title">
						<h3>{{ ori.Name }}</h3>
					</div>
					<div class="card-text">
						<p><iframe width="280" :src="ori.yUrl" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>{{ ori.wTeaser }}.</p>
						<div class="text-right">
							<a class="btn btn-warning" :href="ori.wUrl" target="_blank">Source</a>
						</div>
					</div>
				</div>
				<h1>20 Like Your Choice</h1>
			</div>
		</section>
		
	`
})

const vm = new Vue({
  el: '#bandslike-app',
  data: {
    results: [],
	term: '',
	lookfor: '',
	orig: []
  },
  methods: {
	search:function() {
		axios.get("https://tastedive.com/api/similar?q=" + this.term + "&k=403769-SimilarA-VZVHPWN7&type=" + this.lookfor + "&verbose=1")
		.then(response => {
			this.results = response.data.Similar.Results;
			this.orig = response.data.Similar.Info;
			console.log(response);
		})
	}
  }
});

document.head.insertAdjacentHTML("beforeend", `
<style>

	.card {
		padding: 1rem;
		margin-bottom: 1rem;
	}
	h3 {
		background-color: #eee;
		padding: 1rem;
	}
	section,
	.footer {
		margin: 2rem 0;
	}
	section {
		position: relative;
		z-index: 9;
	}
	.band-search {
		margin-bottom: 2rem;
		top: 0;
		position: sticky;
		z-index: 999;
		background-color: #eee;
		border-bottom: 2px solid #ccc;
		padding: 2rem;
		outline: 10px solid #fff;
	}
	iframe {
		float: left;
		margin-right: 1rem;
		margin-bottom: 1rem;
	}
	[v-cloak] {
		display: none;
	}
	select {
		margin-top: 1rem;
		margin-bottom: 1rem;
	}
	.text-right {
		float: right;
	}
	input:focus:invalid,
	select:focus:invalid {			
		border: 2px solid red;
	}
	input:focus:valid,
	select:focus:valid {			
		border: 2px solid green;
	}

</style>
`)