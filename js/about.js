let currentDisaster = 0;

        const disasters = [
            {
                name: "Kashmir Earthquake 2005",
                year: "2005",
                magnitude: "7.6 Magnitude",
                casualties: "73,000+ lives lost",
                affected: "3.5 million people affected",
                location: "Pakistan-administered Kashmir & Northern India",
                image: "https://ichef.bbci.co.uk/ace/standard/976/cpsprodpb/1A31/production/_85950760_85950759.jpg.webp",
                description: "The deadliest earthquake in South Asia's recorded history struck at 8:50 AM on a Saturday morning. Most victims were trapped in collapsed buildings - concrete structures that became death traps. Children were in schools, families were having breakfast. In 90 seconds, entire communities disappeared.",
                lesson: "Most deaths occurred due to building collapses. Proper evacuation drills and earthquake-resistant construction knowledge could have saved tens of thousands of lives."
            },
            {
                name: "Uttarakhand Floods 2013",
                year: "2013",
                magnitude: "Cloudbursts & Floods",
                casualties: "5,700+ missing, presumed dead",
                affected: "110,000 pilgrims stranded",
                location: "Uttarakhand, Northern India",
                image: "https://akm-img-a-in.tosshub.com/indiatoday/images/story/201306/flood2_660_061913031510.jpg?VersionId=b6usuPFOypS_zRjW8NLLc5kSLAcavw50&size=690:388",
                description: "The 'Himalayan Tsunami' struck during peak pilgrimage season. Kedarnath temple, a spiritual haven for centuries, became a survival battlefield. Tourists expecting a peaceful journey found themselves fighting for their lives as rivers turned into raging torrents.",
                lesson: "Early warning systems, weather monitoring, and evacuation route knowledge are critical in mountainous regions prone to flash floods."
            },
{
  name: "Kerala Floods 2018",
  year: "2018",
  magnitude: "Worst floods in 94 years",
  casualties: "400+ lives lost",
  affected: "5.4 million people affected",
  location: "Kerala, Southern India",
  // direct file URL (use this)
  image: "https://upload.wikimedia.org/wikipedia/commons/a/a3/SNC_Initiates_Operation_Madad_in_Kerala-opmadad70.jpg",
  description: "For the first time in 26 years, all five main dams had to be opened simultaneously. ...",
  lesson: "Community preparedness, local knowledge of safe zones, and coordinated rescue efforts save lives during unprecedented disasters."
},

            {
                name: "Cyclone Amphan 2020",
                year: "2020",
                magnitude: "Super Cyclone - 185 kmph winds",
                casualties: "98 deaths (could have been thousands)",
                affected: "10 million people evacuated",
                location: "West Bengal & Bangladesh",
                image: "https://media.vaticannews.va/media/content/dam-archive/vaticannews/agenzie/images/afp/2020/05/21/15/1590067370931.jpg/_jcr_content/renditions/cq5dam.thumbnail.cropped.1500.844.jpeg",
                description: "The strongest cyclone ever recorded in the Bay of Bengal hit during COVID-19 lockdown. But Bengal was ready. Mass evacuations, community shelters, and early warnings turned a potential mega-disaster into a manageable crisis.",
                lesson: "Preparedness works. When communities know what to do and authorities coordinate well, even the strongest cyclones can't break the human spirit."
            },
            {
                name: "Chennai Floods 2015",
                year: "2015",
                magnitude: "Heaviest rainfall in 100+ years",
                casualties: "500+ lives lost",
                affected: "4.5 million people affected",
                location: "Chennai, Tamil Nadu",
                image: "https://www.researchgate.net/publication/355167797/figure/fig4/AS:1077959695831078@1634017027799/Chennai-floods-2015-view-of-Chennai-submerged-in-storm-water-flood.png",
                description: "The IT capital of India became a vast lake. Airports, railways, and roads disappeared under water. Tech employees were stranded in offices for days. The city that never sleeps was forced into silence by nature's fury.",
                lesson: "Urban planning with disaster resilience and community emergency response networks are crucial for metropolitan areas."
            },
            {
                name: "Gujarat Earthquake 2001",
                year: "2001",
                magnitude: "7.7 Magnitude",
                casualties: "20,000+ lives lost",
                affected: "6.9 million people affected",
                location: "Gujarat, Western India",
                image: "https://images.mid-day.com/images/images/2024/jan/2001-gujarat-earthquake-bhuj-development-authority-file_d.jpg?VersionId=b6usuPFOypS_zRjW8NLLc5kSLAcavw50&size=690:388",
                description: "On Republic Day morning, when the nation was celebrating, Gujarat was devastated in 90 seconds. Entire towns like Bhuj were flattened. The earthquake was felt as far as Nepal and Bangladesh, but Gujarat bore the brunt.",
                lesson: "Building codes matter. Traditional construction methods and modern engineering must work together to save lives during seismic events."
            },
            {
                name: "Assam Floods 2020",
                year: "2020",
                magnitude: "Monsoon floods affecting 55+ districts",
                casualties: "190+ lives lost",
                affected: "5.6 million people affected",
                location: "Assam, Northeast India",
                image: "https://www.vifindia.org/sites/default/files/Picture1_38.jpg",
                description: "Every year, Assam faces the dual challenge of monsoon floods and erosion. In 2020, while the world battled COVID-19, Assam fought both pandemic and floods. Families evacuated to relief camps faced additional health risks.",
                lesson: "Annual disaster preparedness, early warning systems, and community resilience are essential for flood-prone regions."
            }
        ];

        function updateDisasterDisplay() {
            const disaster = disasters[currentDisaster];

            // Update detail view
            document.getElementById('disaster-img').src = disaster.image;
            document.getElementById('disaster-img').alt = disaster.name;
            document.getElementById('disaster-badge').textContent = disaster.magnitude;
            document.getElementById('disaster-location').innerHTML = `📍 ${disaster.location}`;
            document.getElementById('disaster-title').textContent = disaster.name;
            document.getElementById('stat-casualties').textContent = disaster.casualties;
            document.getElementById('stat-affected').textContent = disaster.affected;
            document.getElementById('disaster-description').textContent = disaster.description;
            document.getElementById('disaster-lesson').textContent = disaster.lesson;

            // Update active card
            const cards = document.querySelectorAll('.disaster-card');
            cards.forEach((card, index) => {
                if (index === currentDisaster) {
                    card.classList.add('active');
                } else {
                    card.classList.remove('active');
                }
            });
        }

        function selectDisaster(index) {
            currentDisaster = index;
            updateDisasterDisplay();
        }

        function changeDisaster(direction) {
            currentDisaster += direction;
            if (currentDisaster < 0) {
                currentDisaster = disasters.length - 1;
            } else if (currentDisaster >= disasters.length) {
                currentDisaster = 0;
            }
            updateDisasterDisplay();
        }

        function initializeDisasterCards() {
            const container = document.querySelector('.disaster-cards');
            container.innerHTML = '';

            disasters.forEach((disaster, index) => {
                const card = document.createElement('div');
                card.className = `disaster-card ${index === 0 ? 'active' : ''}`;
                card.onclick = () => selectDisaster(index);
                card.innerHTML = `
                    <div class="disaster-year">${disaster.year}</div>
                    <div class="disaster-name">${disaster.name}</div>
                    <div class="disaster-magnitude">${disaster.magnitude}</div>
                    <div class="disaster-casualties">${disaster.casualties.split(' ')[0]}</div>
                `;
                container.appendChild(card);
            });
        }

        /* ---------- Video modal logic ---------- */
        (function () {
            const modal = document.getElementById('videoModal');
            const backdrop = document.getElementById('videoModalBackdrop');
            const closeBtn = document.getElementById('videoModalClose');
            const frameContainer = document.getElementById('videoFrameContainer');

            // Open modal and load YouTube embed
            function openVideoModal(videoId, title) {
                // Build embed URL with autoplay
                const embedUrl = `https://www.youtube.com/embed/${encodeURIComponent(videoId)}?rel=0&showinfo=0&autoplay=1&modestbranding=1`;
                // Create iframe element
                frameContainer.innerHTML = '';
                const iframe = document.createElement('iframe');
                iframe.setAttribute('src', embedUrl);
                iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
                iframe.setAttribute('allowfullscreen', '');
                iframe.setAttribute('title', title || 'Video player');
                frameContainer.appendChild(iframe);

                // Show modal
                modal.classList.add('open');
                modal.setAttribute('aria-hidden', 'false');

                // prevent page scroll while open
                document.body.style.overflow = 'hidden';
            }

            // Close modal and stop video
            function closeVideoModal() {
                // Remove iframe to stop playback
                frameContainer.innerHTML = '';
                modal.classList.remove('open');
                modal.setAttribute('aria-hidden', 'true');
                document.body.style.overflow = '';
            }

            // click handlers: open when clicking a video card or the play button
            document.addEventListener('click', function (e) {
                const card = e.target.closest('.video-card');
                if (card) {
                    const videoId = card.getAttribute('data-video-id');
                    const title = card.getAttribute('data-video-title') || '';
                    if (videoId) {
                        openVideoModal(videoId, title);
                        return;
                    }
                }

                // handle clicks on explicit play buttons inside thumbnails
                const playBtn = e.target.closest('.play-btn');
                if (playBtn) {
                    const cardParent = playBtn.closest('.video-card');
                    if (cardParent) {
                        const videoId = cardParent.getAttribute('data-video-id');
                        const title = cardParent.getAttribute('data-video-title') || '';
                        if (videoId) {
                            openVideoModal(videoId, title);
                        }
                    }
                }
            });

            // close actions
            closeBtn.addEventListener('click', closeVideoModal);
            backdrop.addEventListener('click', closeVideoModal);
            // close on ESC
            document.addEventListener('keydown', function (e) {
                if (e.key === 'Escape' && modal.classList.contains('open')) {
                    closeVideoModal();
                }
            });

            // Expose (optional) for debugging if needed
            window.__openVideoModal = openVideoModal;
            window.__closeVideoModal = closeVideoModal;
        })();

        // Initialize page
        document.addEventListener('DOMContentLoaded', function () {
            initializeDisasterCards();
            updateDisasterDisplay();
        });
