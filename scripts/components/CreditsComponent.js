/*
 *  Credits Component
 *
 *  requires:
 *      React
 *
 *  Static page to give shout out to the development team and design consultants
 *
 */

var React = require('react');
var ReactDOM = require('react-dom');

module.exports = React.createClass({
	render: function() {

		return (
			<div className="credits-container">
				<div className="row">
					<div className="credits-title">
						<h1>Credits</h1>
					</div>
					<div className="left-side ten columns">
						<table>
							<thead>
								<tr className="credits-table-header">
									<th colSpan="5">Scrum Master - Technical Advisor</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>Aaron Larner</td>
									<td><a href="https://github.com/alarner"><img src="../../images/GitHub-Mark-32px.png" /></a></td>
									<td><a href="http://nutellahabit.com/">blog</a></td>
									<td></td>
									<td></td>
								</tr>
							</tbody>
						</table>

						<table>
							<thead>
								<tr>
									<th colSpan="2">Assistant Technical Advisor</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>Allen Garcia</td>
									<td><a href="https://github.com/awg24"><img src="../../images/GitHub-Mark-32px.png" /></a></td>
									<td><a href="https://twitter.com/Allenwg"><img src="../../images/TwitterLogo_55acee.png" /></a></td>
									<td><a href="https://www.linkedin.com/in/allenwes"><img src="../../images/Logo-Black-21px-R.png" /></a></td>
									<td><a href="https://awg24.github.io/">portfolio</a></td>
								</tr>
							</tbody>
						</table>
						<table>
							<thead>
								<tr className="credits-table-header">
									<th>Developer</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>Troy Acosta</td>
									<td><a href="https://github.com/troyacosta"><img src="../../images/GitHub-Mark-32px.png" /></a></td>
								</tr>
								<tr>
									<td>Michael Adossi</td>
									<td><a href="https://github.com/ANnamdi"><img src="../../images/GitHub-Mark-32px.png" /></a></td>
								</tr>
								<tr>
									<td>Josiah Allen</td>
									<td><a href="https://github.com/josiahgallen"><img src="../../images/GitHub-Mark-32px.png" /></a></td>
									<td><a href="https://twitter.com/jygajojo"><img src="../../images/TwitterLogo_55acee.png" /></a></td>
									<td><a href="https://www.linkedin.com/in/josiahgallen"><img src="../../images/Logo-Black-21px-R.png" /></a></td>
									<td><a href="http://rookiequarterbackcoder.tumblr.com/">blog</a></td>
								</tr>
								<tr>
									<td>Gabriel Bird</td>
									<td><a href="https://github.com/gbirdjones"><img src="../../images/GitHub-Mark-32px.png" /></a></td>
								</tr>
								<tr>
									<td>Michael Dillie</td>
									<td><a href="https://github.com/MichaelDillie"><img src="../../images/GitHub-Mark-32px.png" /></a></td>
								</tr>
								<tr>
									<td>Noel Ferris</td>
									<td><a href="https://github.com/noelfarris"><img src="../../images/GitHub-Mark-32px.png" /></a></td>
								</tr>
								<tr>
									<td>Mory Friedman</td>
									<td><a href="https://github.com/Moryf1990"><img src="../../images/GitHub-Mark-32px.png" /></a></td>
								</tr>
								<tr>
									<td>Bob McCarthy</td>
									<td><a href="https://github.com/bobmccarthy"><img src="../../images/GitHub-Mark-32px.png" /></a></td>
									<td><a href="http://bobatx.tumblr.com/">blog</a></td>
								</tr>
								<tr>
									<td>Gladys Maniago</td>
									<td><a href="https://github.com/gmaniago"><img src="../../images/GitHub-Mark-32px.png" /></a></td>
								</tr>
								<tr>
									<td>Mike Mathew</td>
									<td><a href="https://github.com/m2mathew"><img src="../../images/GitHub-Mark-32px.png" /></a></td>
									<td><a href="https://twitter.com/drumsensei"><img src="../../images/TwitterLogo_55acee.png" /></a></td>
									<td><a href="https://www.linkedin.com/in/m2mathew"><img src="../../images/Logo-Black-21px-R.png" /></a></td>
									<td><a href="http://drumsensei.com/">blog</a></td>
								</tr>
								<tr>
									<td>Aaron Micko</td>
									<td><a href="https://github.com/amicko"><img src="../../images/GitHub-Mark-32px.png" /></a></td>
								</tr>
								<tr>
									<td>Jacob Mingus</td>
									<td><a href="https://github.com/Jmingus"><img src="../../images/GitHub-Mark-32px.png" /></a></td>
									<td><a href="https://jmingus.herokuapp.com/">blog</a></td>
								</tr>
								<tr>
									<td>Joseph Muela</td>
									<td><a href="https://github.com/Joseph-A-Muela"><img src="../../images/GitHub-Mark-32px.png" /></a></td>
								</tr>
								<tr>
									<td>Whitney Murray</td>
									<td><a href="https://github.com/Klingon1717"><img src="../../images/GitHub-Mark-32px.png" /></a></td>
								</tr>
								<tr>
									<td>Jimi Stitts</td>
									<td><a href="https://github.com/jstitts"><img src="../../images/GitHub-Mark-32px.png" /></a></td>
									<td><a href="https://twitter.com/JimiTweeted"><img src="../../images/TwitterLogo_55acee.png" /></a></td>
								</tr>
								<tr>
									<td>Leslie Sutton</td>
									<td><a href="https://github.com/suttonofswat"><img src="../../images/GitHub-Mark-32px.png" /></a></td>
									<td><a href="http://www.linkedin.com/in/lesliecsutton"><img src="../../images/Logo-Black-21px-R.png" /></a></td>
									<td><a href="https://twitter.com/suttonofswat"><img src="../../images/TwitterLogo_55acee.png" /></a></td>
								</tr>
							</tbody>
						</table>

						<table>
							<thead>
								<tr className="credits-table-header">
									<th colSpan="2">Lead Design Consultant</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>Abby Larner</td>
									<td><a href="https://github.com/abbylarner/abbylarner.github.io"><img src="../../images/GitHub-Mark-32px.png" /></a></td>
									<td><a href="https://twitter.com/abbylarner"><img src="../../images/TwitterLogo_55acee.png" /></a></td>
									<td><a href="http://abbylarner.com/">portfolio</a></td>
								</tr>
							</tbody>
						</table>

						<table>
							<thead>
								<tr className="credits-table-header">
									<th>Designer</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>Emily DeVoll</td>
									<td><a href="https://github.com/emilydevoll"><img src="../../images/GitHub-Mark-32px.png" /></a></td>
								</tr>
								<tr>
									<td>Corey Elliott</td>
									<td><a href="https://github.com/ellcorey"><img src="../../images/GitHub-Mark-32px.png" /></a></td>
								</tr>
								<tr>
									<td>Jay Hollinsworth</td>
									<td><a href="https://github.com/jhollinsworth"><img src="../../images/GitHub-Mark-32px.png" /></a></td>
									<td><a href="https://dribbble.com/jhollinsworth"><img src="../../images/dribbble-ball-mark.png" /></a></td>
								</tr>
								<tr>
									<td>Ryan Johnson</td>
									<td><a href="https://github.com/rpainterj"><img src="../../images/GitHub-Mark-32px.png" /></a></td>
								</tr>
								<tr>
									<td>Alex MacDuff</td>
									<td><a href="https://github.com/amacduff"><img src="../../images/GitHub-Mark-32px.png" /></a></td>
									<td><a href="https://dribbble.com/amacduff"><img src="../../images/dribbble-ball-mark.png" /></a></td>
								</tr>
								<tr>
									<td>Daniel Merrill</td>
									<td><a href="https://github.com/dmerrill88"><img src="../../images/GitHub-Mark-32px.png" /></a></td>
								</tr>
								<tr>
									<td>Liz Schilb</td>
									<td><a href="https://github.com/eschilb"><img src="../../images/GitHub-Mark-32px.png" /></a></td>
								</tr>
							</tbody>
						</table>

					</div>
				</div>
			</div>
		);
	}
});
