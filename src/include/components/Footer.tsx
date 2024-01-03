import React from 'react';
import logo from 'include/images/NVPrimeLogo.png'

function Footer ()
{
	return (
		<div className="footer">
			<div className='row'>
				<div className="col-md-6" style={{padding: "50px"}}>
					<a href="#top-navbar">
						<img src={logo} className="footer-logo" alt="Nevada Prime Logo"/>
					</a>
					<strong style={{marginBottom: "10px"}}>
						<div><u>Nevada Prime Real Estate, LLC</u></div>
						<div>
							<em>
								Michelle Barney&nbsp;
								<sup>&reg;B143247/PM.165133.BKR</sup>
							</em>
						</div>
						<div><em>Broker-Owner/Property Manager&nbsp;</em></div>
						<div><a href="tel:775-303-7558"><em>(775)303-7558</em></a></div>
					</strong>
					<div><strong><u>Office Location</u></strong></div>
					<div>1032 Inglewood Dr., Suite 100&nbsp;</div>
					<div>Fernley, NV 89408</div>
					<div>Phone:&nbsp;<a href="tel:775-234-5054">775-234-5054</a></div>
					<div><a href="mailto:michelle@nvprimehomes.com">michelle@nvprimehomes.com</a></div>
				</div>
				<div className="col-md-4" style={{padding: "50px"}}>
					<h2>Explore</h2>
					<div><a href="/homes-for-sale-in-fernley-nv">Fernley, NV</a></div>
					<div><a href="/homes-for-sale-in-reno-nv">Reno, NV</a></div>
					<div><a href="/homes-for-sale-in-sparks-nv">Sparks, NV</a></div>
					<div><a href="/homes-for-sale-in-carsoncity-nv">Carson City, NV</a></div>
					<div><a href="/homes-for-sale-in-fallon-nv">Fallon, NV</a></div>
					<div><a href="/homes-for-sale-in-silverspings-nv">Silver Springs, NV</a></div>
				</div>
				<div className="col-md-2" style={{padding: "50px"}}>
					<p>
						<a href="https://www.facebook.com/nevadaprime/" target="_blank" rel="noreferrer" className="social-icon social-icon-facebook">
							<span><i className="fab fa-facebook-f"></i></span>
							<span className="sr-only">Facebook</span>
						</a>
						<a href="https://www.linkedin.com/in/michellebarney" target="_blank" rel="noreferrer" className="social-icon social-icon-linkedin">
							<span><i className="fab fa-linkedin-in"></i></span>
							<span className="sr-only">LinkedIn</span>
						</a>
						<a href="http://instagram.com/nvprimerealestate/" target="_blank" rel="noreferrer" className="social-icon social-icon-instagram">
							<span><i className="fab fa-instagram"></i></span>
							<span className="sr-only">Instagram</span>
						</a>
					</p>
				</div>
			</div>
			<div>
				<p id="FooterLinks" style={{textAlign: "center"}}>
					<a className="footer-link" href="/-/Home/privacy/"><span>Privacy Policy</span></a>
					| 
					<a className="footer-link" href="/-/Home/dmca/"><span>DMCA</span></a>
				</p>
			</div>
			<div className="mls_disclaimers container-fluid">
				<div className="row">
					<div className="col">
						<div className="mls-disclaimer mb-2">
							<img className="disclaimer-logo" src="https://mls-info-ihouseprd.b-cdn.net/NV-RSARMLS/icons/NV-RSARMLS_icon.png" alt="Northern Nevada Regional MLS" width="125" height="27" loading="lazy"/>
							&copy;2024, Northern Nevada Regional MLS. All rights reserved.
							<br/>
							The data relating to real estate for sale on this web site comes in part from the Broker Reciprocity<sup>sm</sup>
							Program of the Northern Nevada Regional MLS, Inc. Real estate listings held by brokerage firms other than <b>Nevada Prime Real Estate</b>
							are marked with the Broker Reciprocity<sup>sm</sup> logo or the Broker Reciprocity<sup>sm</sup> thumbnail logo and detailed information
							about them includes the name of the listing brokers.
							The broker providing these data believes them to be correct, but advises interested parties to confirm them before relying on them in a
							purchase decision.<br/>
							Information last updated on 2024-01-02 16:30:18.
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Footer;
