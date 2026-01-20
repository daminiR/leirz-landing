import React from 'react';
export const Nav30DataSource = {
  wrapper: { className: 'header3 home-page-wrapper' },
  page: { className: 'home-page' },
  logo: {
    className: 'header3-logo',
    children:
      'https://gw.alipayobjects.com/zos/basement_prod/b30cdc2a-d91c-4c78-be9c-7c63b308d4b3.svg',
  },
  Menu: {
    className: 'header3-menu',
    children: [
      {
        name: 'item2',
        className: 'header3-item',
        children: {
          href: '#',
          children: [
            {
              children: (
                <span>
                  <span>
                    <p>Terms and Conditions</p>
                  </span>
                </span>
              ),
              name: 'text',
            },
          ],
        },
        subItem: null,
      },
    ],
  },
  mobileMenu: { className: 'header3-mobile-menu' },
};
export const Banner50DataSource = {
  wrapper: { className: 'home-page-wrapper banner5' },
  page: { className: 'home-page banner5-page m7gwqh699y6-editor_css' },
  childWrapper: {
    className: 'banner5-title-wrapper',
    children: [
      {
        name: 'title',
        children: (
          <span>
            <span>
              <span>
                <span>
                  <span>
                    <p>Leirz</p>
                  </span>
                </span>
              </span>
            </span>
          </span>
        ),
        className: 'banner5-title m7gxlb7eg7-editor_css',
      },
      {
        name: 'explain',
        className: 'banner5-explain m7gxlfjapxe-editor_css',
        children: (
          <span>
            <span>
              <span>
                <p>Uncover the Stories Beneath Your Feet</p>
              </span>
            </span>
          </span>
        ),
      },
      {
        name: 'content',
        className: 'banner5-content',
        children: (
          <span>
            <p>Get surprising facts about the places you pass by every day</p>
          </span>
        ),
      },
      {
        name: 'image~m7gzsoxwg6u',
        className: 'm7gzsq7ueq-editor_css',
        children: 'https://zos.alipayobjects.com/rmsportal/HzvPfCGNCtvGrdk.png',
      },
    ],
  },
  image: {
    className: 'banner5-image',
    children:
      'https://cdn.dribbble.com/users/5046932/screenshots/15839286/call_ui_animation_dribble_1.png?resize=400x0',
  },
};
export const Content10DataSource = {
  wrapper: { className: 'home-page-wrapper content1-wrapper' },
  OverPack: {
    className: 'home-page content1 m7gxtbud2ep-editor_css',
    playScale: 0.3,
  },
  imgWrapper: { className: 'content1-img', md: 10, xs: 24 },
  img: {
    children:
      'https://socialmarketing90.com/wp-content/uploads/2023/12/OpenAI-Logo-Version-1.png',
    className: 'm7gzp65cy8q-editor_css',
  },
  textWrapper: { className: 'content1-text', md: 14, xs: 24 },
  title: {
    className: 'content1-title',
    children: (
      <span>
        <span>
          <p>A Fresh Take on Local Facts, with AI Behind the Scenes</p>
        </span>
      </span>
    ),
  },
  content: {
    className: 'content1-content',
    children: (
      <span>
        <p>
          Unravel stories from music, sports, fashion, and more, right where
          they happened. Each marker offers a brief glimpse into the past as you
          go about your day.
        </p>
      </span>
    ),
  },
};
export const Feature60DataSource = {
  wrapper: { className: 'home-page-wrapper feature6-wrapper' },
  OverPack: {
    className: 'home-page feature6 m7gxhcpfad-editor_css',
    playScale: 0.3,
  },
  Carousel: {
    className: 'feature6-content',
    dots: false,
    wrapper: { className: 'feature6-content-wrapper' },
    titleWrapper: {
      className: 'feature6-title-wrapper',
      barWrapper: {
        className: 'feature6-title-bar-wrapper m7gxk99aaur-editor_css',
        children: { className: 'feature6-title-bar m7gxjzgw8to-editor_css' },
      },
      title: { className: 'feature6-title' },
    },
    children: [
      {
        title: {
          className: 'feature6-title-text m7gxjvnolbm-editor_css',
          children: (
            <span>
              <p>See What’s Mapped So Far</p>
            </span>
          ),
        },
        className: 'feature6-item',
        name: 'block0',
        children: [
          {
            md: 8,
            xs: 24,
            className: 'feature6-number-wrapper',
            name: 'child0',
            number: {
              className: 'feature6-number m7gxbkpjuwh-editor_css',
              unit: {
                className: 'feature6-unit m7gxevtzxbt-editor_css',
                children: (
                  <span>
                    <span>
                      <p>
                        <br />
                      </p>
                    </span>
                  </span>
                ),
              },
              toText: true,
              children: '600000',
            },
            children: {
              className: 'feature6-text',
              children: (
                <span>
                  <p>Markers</p>
                </span>
              ),
            },
          },
          {
            md: 8,
            xs: 24,
            className: 'feature6-number-wrapper',
            name: 'child1',
            number: {
              className: 'feature6-number m7gxeg66vcb-editor_css',
              unit: {
                className: 'feature6-unit',
                children: (
                  <span>
                    <span>
                      <br />
                    </span>
                  </span>
                ),
              },
              toText: true,
              children: '1500',
            },
            children: {
              className: 'feature6-text',
              children: (
                <span>
                  <p>Cities</p>
                </span>
              ),
            },
          },
          {
            md: 8,
            xs: 24,
            className: 'feature6-number-wrapper',
            name: 'child2',
            number: {
              className: 'feature6-number m7gxfxo0b8-editor_css',
              unit: {
                className: 'feature6-unit',
                children: (
                  <span>
                    <br />
                  </span>
                ),
              },
              toText: true,
              children: '12',
            },
            children: {
              className: 'feature6-text',
              children: (
                <span>
                  <p>Historic Eras</p>
                </span>
              ),
            },
          },
        ],
      },
    ],
  },
};
export const Content30DataSource = {
  wrapper: { className: 'home-page-wrapper content3-wrapper' },
  page: { className: 'home-page content3 m7gw5rbgt8-editor_css' },
  OverPack: { playScale: 0.3 },
  titleWrapper: {
    className: 'title-wrapper',
    children: [
      {
        name: 'title',
        children: (
          <span>
            <p>How It Works</p>
          </span>
        ),
        className: 'title-h1 m7gw5jso8p-editor_css',
      },
      {
        name: 'content',
        className: 'title-content',
        children: (
          <span>
            <p>Here’s how you can discover local history in your own way</p>
          </span>
        ),
      },
    ],
  },
  block: {
    className: 'content3-block-wrapper',
    children: [
      {
        name: 'block0',
        className: 'content3-block',
        md: 8,
        xs: 24,
        children: {
          icon: {
            className: 'content3-icon',
            children:
              'https://zos.alipayobjects.com/rmsportal/ScHBSdwpTkAHZkJ.png',
          },
          textWrapper: { className: 'content3-text' },
          title: {
            className: 'content3-title m7gxivz08n-editor_css',
            children: (
              <span>
                <p>Save Markers</p>
              </span>
            ),
          },
          content: {
            className: 'content3-content',
            children: (
              <span>
                <p>
                  Bookmark places you find interesting, then come back to them
                  whenever you want.
                </p>
              </span>
            ),
          },
        },
      },
      {
        name: 'block1',
        className: 'content3-block',
        md: 8,
        xs: 24,
        children: {
          icon: {
            className: 'content3-icon',
            children:
              'https://zos.alipayobjects.com/rmsportal/NKBELAOuuKbofDD.png',
          },
          textWrapper: { className: 'content3-text' },
          title: {
            className: 'content3-title m7gxiuuref-editor_css',
            children: (
              <span>
                <p>View Nearby Markers</p>
              </span>
            ),
          },
          content: {
            className: 'content3-content',
            children: (
              <span>
                <p>
                  Quickly spot historical highlights right around your current
                  location.
                </p>
              </span>
            ),
          },
        },
      },
      {
        name: 'block2',
        className: 'content3-block',
        md: 8,
        xs: 24,
        children: {
          icon: {
            className: 'content3-icon',
            children:
              'https://zos.alipayobjects.com/rmsportal/xMSBjgxBhKfyMWX.png',
          },
          textWrapper: { className: 'content3-text' },
          title: {
            className: 'content3-title m7gxj1m5z2h-editor_css',
            children: (
              <span>
                <p>Use Tags &amp; Filters</p>
              </span>
            ),
          },
          content: {
            className: 'content3-content',
            children: (
              <span>
                <span>
                  <span>
                    <p>
                      <span>
                        Pick exactly what interests you, from “Socratic Method”
                        to “germ theory,” and see only the markers that match
                        your passions.
                      </span>
                      <br />
                    </p>
                  </span>
                </span>
              </span>
            ),
          },
        },
      },
      {
        name: 'block3',
        className: 'content3-block',
        md: 8,
        xs: 24,
        children: {
          icon: {
            className: 'content3-icon',
            children:
              'https://zos.alipayobjects.com/rmsportal/MNdlBNhmDBLuzqp.png',
          },
          textWrapper: { className: 'content3-text' },
          title: {
            className: 'content3-title m7gxjheljd-editor_css',
            children: (
              <span>
                <p>Pick a Decade</p>
              </span>
            ),
          },
          content: {
            className: 'content3-content',
            children: (
              <span>
                <p>
                  Jump to any time period and see how spots evolved across the
                  years.
                </p>
              </span>
            ),
          },
        },
      },
      {
        name: 'block4',
        className: 'content3-block',
        md: 8,
        xs: 24,
        children: {
          icon: {
            className: 'content3-icon',
            children:
              'https://zos.alipayobjects.com/rmsportal/UsUmoBRyLvkIQeO.png',
          },
          textWrapper: { className: 'content3-text' },
          title: {
            className: 'content3-title m7gxjdnxape-editor_css',
            children: (
              <span>
                <p>Read Quick Summaries</p>
              </span>
            ),
          },
          content: {
            className: 'content3-content',
            children: (
              <span>
                <p>
                  Get concise info for each location, so you grab the essentials
                  without extra fuss.
                </p>
              </span>
            ),
          },
        },
      },
      {
        name: 'block5',
        className: 'content3-block',
        md: 8,
        xs: 24,
        children: {
          icon: {
            className: 'content3-icon',
            children:
              'https://zos.alipayobjects.com/rmsportal/ipwaQLBLflRfUrg.png',
          },
          textWrapper: { className: 'content3-text' },
          title: {
            className: 'content3-title',
            children: (
              <span>
                <p>Navigate with Ease</p>
              </span>
            ),
          },
          content: {
            className: 'content3-content',
            children: (
              <span>
                <p>
                  A clean, intuitive map layout keeps exploration simple and
                  stress-free.
                </p>
              </span>
            ),
          },
        },
      },
    ],
  },
};
export const Footer10DataSource = {
  wrapper: {
    className: 'home-page-wrapper footer1-wrapper m7gzw39n1kc-editor_css',
  },
  OverPack: { className: 'footer1', playScale: 0.2 },
  block: {
    className: 'home-page m7gzkea42vs-editor_css',
    gutter: 0,
    children: [
      {
        name: 'block0',
        xs: 24,
        md: 6,
        className: 'block',
        title: {
          className: 'logo',
          children:
            'https://zos.alipayobjects.com/rmsportal/qqaimmXZVSwAhpL.svg',
        },
        childWrapper: {
          className: 'slogan',
          children: [
            {
              name: 'content0',
              children: (
                <span>
                  <p>
                    <br />
                  </p>
                </span>
              ),
            },
          ],
        },
      },
      {
        name: 'block2',
        xs: 24,
        md: 6,
        className: 'block',
        title: {
          children: (
            <span>
              <p>About</p>
            </span>
          ),
          className: 'm7gzklzjgb9-editor_css',
        },
        childWrapper: {
          children: [
            {
              href: '#',
              name: 'link0',
              children: (
                <span>
                  <p>About</p>
                </span>
              ),
              className: 'm7gzkri26cr-editor_css',
            },
            {
              href: '#',
              name: 'link1',
              children: (
                <span>
                  <span>
                    <span>
                      <span>
                        <p>Contact Us</p>
                      </span>
                    </span>
                  </span>
                </span>
              ),
              className: 'm7gzkxre6o-editor_css',
            },
          ],
        },
      },
      {
        name: 'block3',
        xs: 24,
        md: 6,
        className: 'block',
        title: {
          children: (
            <span>
              <span>
                <span>
                  <p>Legal</p>
                </span>
              </span>
            </span>
          ),
          className: 'm7gzl9o3fut-editor_css',
        },
        childWrapper: {
          children: [
            {
              href: '#',
              name: 'link0',
              children: (
                <span>
                  <p>Privacy</p>
                </span>
              ),
              className: 'm7gzl28v22-editor_css',
            },
            {
              href: '#',
              name: 'link1',
              children: (
                <span>
                  <p>Terms</p>
                </span>
              ),
              className: 'm7gzl5pvwsu-editor_css',
            },
          ],
        },
      },
    ],
  },
  copyrightWrapper: { className: 'copyright-wrapper' },
  copyrightPage: { className: 'home-page m7gzvwhmawo-editor_css' },
  copyright: {
    className: 'copyright m7gzvpiygle-editor_css',
    children: (
      <span>
        <span>© 2025</span>
        <span>&nbsp;leirz</span>
      </span>
    ),
  },
};
