var $ = jQuery,
    wind = jQuery(window),
    body = jQuery("body"),
    dsnGrid = {
        backgroundPosition: function(e, n, t) {
            var o, i, a, s, r;
            return e instanceof jQuery == !1 && (e = jQuery(e)), t = this.getUndefinedVal(t, {}), o = this.getUndefinedVal(t.sizeX, "105%"), i = this.getUndefinedVal(t.sizeY, "105%"), s = this.getUndefinedVal(t.left, "-5%"), r = this.getUndefinedVal(t.top, "-5%"), a = this.getUndefinedVal(t.move, 100), e.css({
                width: o,
                height: i,
                left: s,
                top: r,
                backgroundPositionX: "calc(50% - " + -2 * a + "px)",
                backgroundPositionY: "calc(50% - " + -2 * a + "px)"
            }), n = this.getUndefinedVal(n, 1), e.parent().on("mousemove", function(o) {
                if (void 0 !== t.dataActive && jQuery(this).find(e).hasClass(t.dataActive)) return !1;
                var i = o.clientX / jQuery(this).width() - .5,
                    s = o.clientY / jQuery(this).height() - .5;
                TweenLite.to(jQuery(this).find(e), n, {
                    transformPerspective: 100,
                    x: a * i + a + " ",
                    y: a * s + a + ""
                }), void 0 !== t.onEnter && t.onEnter(jQuery(this), o)
            }).on("mouseleave", function(o) {
                TweenMax.to(jQuery(this).find(e), n, {
                    x: a,
                    y: a,
                    ease: Back.easeOut.config(4)
                }), void 0 !== t.onLeave && t.onLeave(jQuery(this), o)
            }), dsnGrid
        },
        parallaxIt: function(e, n, t, o) {
            if (!(n.length <= 0)) {
                var i = n[0].getBoundingClientRect(),
                    a = e.pageX - i.left,
                    s = e.pageY - i.top,
                    r = window.pageYOffset || document.documentElement.scrollTop;
                o = this.getUndefinedVal(o, .3), t = this.getUndefinedVal(t, -1), TweenMax.to(n, o, {
                    x: (a - i.width / 2) / i.width * t,
                    y: (s - i.height / 2 - r) / i.width * t,
                    ease: Power0.easeOut
                })
            }
        },
        scaleIt: function(e, n, t) {
            if (void 0 === n) return !1;
            var o = 0;
            o = body.hasClass("dsn-effect-scroll") ? e.scrollTop : e.scrollTop();
            var i, a, s;
            s = this.getUndefinedVal(t.plus, 0), i = this.getUndefinedVal(t.position, !1);
            var r = n.offset();
            a = void 0 === r || body.hasClass("dsn-effect-scroll") ? 0 : r.top, i && (a -= o);
            return o / (n.height() + a + s)
        },
        scrollerIt: function(e, n, t) {
            if (void 0 === n) return !1;
            var o, i, a, s = e.scrollTop();
            a = this.getUndefinedVal(t.duration, 0), i = this.getUndefinedVal(t.plus, 0);
            var r = n.offset();
            o = void 0 !== r ? r.top : 0, o += a;
            var d = n.height() + o + i;
            if (o <= s && void 0 !== t.action) {
                var l = o - s,
                    c = l / d,
                    f = s / (n.height() + o + i);
                t.action({
                    scroll: l,
                    position: c,
                    targetEnd: d,
                    ScrollTop: s,
                    num: f
                })
            }
            return f
        },
        setPositionMoveSection: function(e, n, t) {
            if (void 0 !== e) {
                var o = e.offset(),
                    i = void 0 === o ? 0 : o.top;
                n = dsnGrid.getUndefinedVal(n, 2), t = dsnGrid.getUndefinedVal(t, 0);
                var a = (e.innerHeight() + i + t) / 2;
                e.css({
                    marginBottom: a / n * -1
                })
            }
        },
        scrollTop: function(e, n, t, o) {
            n = dsnGrid.getUndefinedVal(n, 500), t = dsnGrid.getUndefinedVal(t, 0);
            var i = 0;
            "number" == typeof e ? i = e : (e instanceof jQuery == !1 && (e = jQuery(e)), void 0 !== (i = e.offset()) && (i = i.top)), jQuery("html, body").animate({
                scrollTop: i + t
            }, n, o)
        },
        getUndefinedVal: function(e, n) {
            return void 0 === e ? n : e
        },
        mouseMove: function(e, n, t) {
            jQuery(window);
            var o = jQuery("body");
            if (dsnGrid.getUndefinedVal(o.data("dsn-mousemove"), !1) && void 0 !== e && !(e.length <= 0) && null !== e) {
                o.addClass("dsn-mousemove"), e instanceof jQuery == !1 && (e = jQuery(e));
                var i = e,
                    a = !1;
                o.on("mousemove", function(e) {
                    i.css({
                        left: e.pageX,
                        top: e.pageY
                    }), void 0 !== n && void 0 !== n.onUpdate && n.onUpdate(e, e.pageX, e.pageY, i), void 0 !== n && void 0 !== n.onComplete && (a = !0, dsnGrid.endAnimate(i, function(e) {
                        a && n.onComplete(e, i), a = !1
                    }))
                })
            }
        },
        endAnimate: function(e, n) {
            void 0 !== n && null !== n && e.one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend", function(e) {
                n(e)
            })
        },
        mouseWheel: function(e, n, t) {
            e.bind("mousewheel DOMMouseScroll", function(e) {
                e.originalEvent.wheelDelta > 0 || e.originalEvent.detail < 0 ? void 0 !== t && t(e) : void 0 !== n && n(e)
            })
        },
        numberText: function(e) {
            return e < 10 && e > 0 ? "0" + e : e
        },
        convertTextLine: function(e, n) {
            var t = e.html().trim(),
                o = "";
            e.html("");
            for (var i = 0; i < t.length; i++) 0 === i && (o += '<div class="dsn-word-wrapper">'), " " !== t.charAt(i) ? o += '<span class="dsn-chars-wrapper">' + t.charAt(i) + "</span>" : o += "</div>" + t.charAt(i) + '<div class="dsn-word-wrapper">';
            o += "</div>", n.append(o)
        },
        randomObjectArray: function(e, n) {
            let t = this.getUndefinedVal(n, 100);
            return e.sort(function() {
                return Math.round(Math.random()) * t
            })
        },
        convertTextWord: function(e, n, t) {
            var o = e.html().trim().split(" "),
                i = "";
            e.html("");
            for (var a = 0; a < o.length; a++)
                if (o[a].length > 0) {
                    if (i += '<span class="dsn-wrapper">', t) {
                        i += '<span class="dsn-word-wrapper">';
                        for (var s = 0; s < o[a].length; s++) i += '<span class="dsn-chars-wrapper">' + o[a].charAt(s) + "</span>";
                        i += "</span>"
                    } else i += '<span class="dsn-word-wrapper">' + o[a] + "</span>";
                    i += "</span>"
                }
            n.append(i)
        },
        getRndInteger: function(e, n) {
            return Math.floor(Math.random() * (n - e)) + e
        },
        pageLoad: function(e, n, t, o) {
            var i = window.performance.timing,
                a = -1 * (i.loadEventEnd - i.navigationStart) / 1e3 % 50 * 10,
                s = e,
                r = n > e ? 1 : -1,
                d = Math.abs(Math.floor((a + t) / 100)),
                l = setInterval(function() {
                    o(s += r), s >= n && clearInterval(l)
                }, d);
            return l
        },
        embedVideo: function(e) {
            jQuery("[data-dsn-video]").each(function(e) {
                var n = jQuery(this),
                    t = dsnGrid.removeAttr(n, "data-dsn-video");
                n.on("click", function() {
                    n.addClass("dsn-video"), n.html('<div class="dsn-iframe-player">' + t + "</div>"), dsnGrid.scrollTop(n, 1600, -100)
                })
            })
        },
        removeAttr: function(e, n) {
            if (void 0 !== e && void 0 !== n) {
                var t = e.attr(n);
                return void 0 !== t && e.removeAttr(n), t
            }
        },
        moveIcon: function(e, n) {
            e.on("mousemove", function(t) {
                var o = "top .15s ease-out,left .15s ease-out";
                n.css({
                    "-webkit-transition": o,
                    "-moz-transition": o,
                    "-ms-transition": o,
                    "-o-transition": o,
                    transition: o,
                    "pointer-events": "none"
                });
                var i = t.pageX,
                    a = t.pageY - jQuery(this).offset().top;
                a > 0 && a < jQuery(this).height() && jQuery(this).offset().left < i && i < e.width() ? n.css({
                    left: i,
                    top: a
                }) : TweenMax.to(n, .5, {
                    left: "50%",
                    top: "50%"
                })
            }).on("mouseleave", function() {
                TweenMax.to(n, .5, {
                    left: "50%",
                    top: "50%"
                })
            })
        },
        parallaxMoveElemnt: function(e, n, t, o, i) {
            var a = e,
                s = e;
            if (void 0 !== e.target && (a = e.target, s = void 0 !== e.element ? e.element : e.target), !(s.length <= 0)) {
                t = void 0 === t ? .5 : parseFloat(t), n = void 0 === n ? 20 : parseFloat(n), i = void 0 !== i && i;
                var r = $('<div class="icon-circle"></div>');
                a.append(r), a.off("mouseleave"), a.off("mouseenter"), a.off("mousemove"), a.on("mouseleave", function(e) {
                    var n = {
                        x: 0,
                        y: 0,
                        ease: Back.easeOut.config(4)
                    };
                    i && (n.scale = 1);
                    var t = [s, r];
                    void 0 !== o && t.push(o), TweenMax.to(t, 1, n)
                }).on("mouseenter", function(e) {
                    var n = {
                        transformOrigin: "0 0"
                    };
                    i && (n.scale = "1.03"), TweenMax.to([s, r], .3, n)
                }).on("mousemove", function(e) {
                    dsnGrid.parallaxIt(e, s, n), dsnGrid.parallaxIt(e, r, 2 * n), void 0 !== o && dsnGrid.parallaxIt(e, o, -5, .5)
                })
            }
        },
        parallaxMoveElemntCir: function(e, n, t, o, i) {
            var a = e,
                s = this;
            t = void 0 === t ? .5 : parseFloat(t), n = void 0 === n ? 20 : parseFloat(n), i = void 0 !== i && i;
            var r = a.html(),
                d = $('<div class="icon-circle"></div>'),
                l = $('<div class="dsn-grid-parallax">' + r + "</div>");
            a.html(""), a.append(d), a.append(l), a.on("mouseleave", function(e) {
                TweenMax.to(a, t, {
                    scale: 1
                }), TweenMax.to(l, .3, {
                    scale: 1,
                    x: 0,
                    y: 0
                }), TweenMax.to(d, t, {
                    scale: 1,
                    x: 0,
                    y: 0
                })
            }).on("mouseenter", function(e) {
                TweenMax.to(a, t, {
                    transformOrigin: "0 0",
                    scale: 1
                }), TweenMax.to(d, t, {
                    scale: 1.2
                })
            }).on("mousemove", function(e) {
                s.parallaxIt(e, l, n), dsnGrid.parallaxIt(e, d, n)
            })
        },
        elementHover: function(e, n, t) {
            e instanceof jQuery == !1 && (e = jQuery(e)), n instanceof jQuery == !1 && (n = jQuery(n)), n.on("mouseenter", function() {
                e.addClass(t)
            }).on("mouseleave", function() {
                e.removeClass(t)
            })
        },
        changeSizeText: function(e, n) {
            e instanceof jQuery == !1 && (e = jQuery(e)), e.each(function() {
                var e = jQuery(this);
                for (var t in n) e.text().length >= parseInt(t) && (console.log(n[t]), e.css(n[t]))
            })
        },
        convertToJQuery: function(e) {
            return e instanceof jQuery == !1 ? jQuery(e) : e
        },
        animateText: function(e, n, t, o) {
            function i() {
                n.each(function() {
                    let e = $(this);
                    if (e.hasClass(a)) return;
                    let n = e.offset().top;
                    void 0 !== n && s > n - (wind.height() - 100) && (e.hasClass(a) || e.addClass(a))
                })
            }(n = this.convertToJQuery(n)).each(function() {
                let e = $(this);
                dsnGrid.convertTextWord(e, e), void 0 !== t && e.attr(t, "animate"), void 0 !== o && e.removeClass(o), e.addClass("dsn-has-animate-text")
            });
            const a = "dsn-animate";
            var s = 0,
                r = null;
            e.getListener(function(e) {
                s = void 0 === e.offset ? wind.scrollTop() : 0, r && clearTimeout(r), r = setTimeout(i, 10)
            })
        },
        imageLoad: function() {
            const e = $('[data-dsn-loader="div"]');
            e.each(function() {
                $(this).append('<div class="wait-loader"><div class="loader-inner"><div class="loader-circle"><div class="loader-layer"></div></div></div></div>')
            });
            e.imagesLoaded({
                background: ".dsn-img-org"
            }).progress(function(e, n) {
                let t = $(n.element).parents('[data-dsn-loader="div"]');
                t.length > 0 && (t.addClass("dsn-img-loader-done dsn-animate"), t.attr("data-dsn-loader", "divFinshed"))
            })
        },
        getBoundingClientRect: function(e) {
            const n = e.getBoundingClientRect();
            return {
                top: n.top,
                right: n.right,
                bottom: n.bottom,
                left: n.left,
                width: n.width,
                height: n.height,
                x: n.x,
                y: n.y
            }
        },
        progressCircle: function(e) {
            const n = $('[data-dsn-grid="progress-circle"]'),
                t = this.removeAttr(n, "data-dsn-grid-stroke");
            var o = void 0 === t ? "" : 'stroke="' + t + '"';
            n.css({
                position: "fixed",
                right: "-60px",
                bottom: "60px",
                width: "52px",
                height: "52px",
                "z-index": "99999999"
            }), n.append('<svg class="dsn-progress-circle-up" width="100%" height="100%" ' + o + ' viewBox="0 0 100 100" preserveAspectRatio="xMinYMin meet" fill="none">\n        <path class="dsn-progress-path" d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98" style="transition:  stroke-dashoffset 300ms linear 0s;stroke-dasharray: 307.919, 307.919; stroke-dashoffset: 309;"></path>    </svg>');
            var i = wind;
            e.isScroller(!0) && (i = e.getScrollbar()), e.getListener(function(e) {
                let t = 0,
                    o = $(document).height() - wind.height();
                void 0 === e.offset ? t = wind.scrollTop() : (t = e.offset.y, o = $(document).height() - i.getSize().content.height + 100), t > 70 ? (TweenMax.to(n, 1, {
                    ease: Back.easeOut.config(4),
                    right: 60
                }), n.find(".dsn-progress-path").css("stroke-dashoffset", 300 - Math.round(300 * t / o) + "%")) : TweenMax.to(n, 1, {
                    ease: Back.easeIn.config(4),
                    right: -60
                })
            }), n.on("click", function() {
                e.isScroller(!0) ? i.scrollTo(0, 0, 600) : $("body,html").animate({
                    scrollTop: 0
                }, 300)
            })
        }
    };