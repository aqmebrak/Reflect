/*! gridster.js - v0.5.6 - 2014-09-25 - * http://gridster.net/ - Copyright (c) 2014 ducksboard; Licensed MIT */
(function (t, i) {
    "function" == typeof define && define.amd ? define("gridster-coords", ["jquery"], i) : t.GridsterCoords = i(t.$ || t.jQuery)
})(this, function (t) {
    function i(i) {
        return i[0] && t.isPlainObject(i[0]) ? this.data = i[0] : this.el = i, this.isCoords = !0, this.coords = {}, this.init(), this
    }

    var e = i.prototype;
    return e.init = function () {
        this.set(), this.original_coords = this.get()
    }, e.set = function (t, i) {
        var e = this.el;
        if (e && !t && (this.data = e.offset(), this.data.width = e.width(), this.data.height = e.height()), e && t && !i) {
            var s = e.offset();
            this.data.top = s.top, this.data.left = s.left
        }
        var r = this.data;
        return r.left === void 0 && (r.left = r.x1), r.top === void 0 && (r.top = r.y1), this.coords.x1 = r.left, this.coords.y1 = r.top, this.coords.x2 = r.left + r.width, this.coords.y2 = r.top + r.height, this.coords.cx = r.left + r.width / 2, this.coords.cy = r.top + r.height / 2, this.coords.width = r.width, this.coords.height = r.height, this.coords.el = e || !1, this
    }, e.update = function (i) {
        if (!i && !this.el)return this;
        if (i) {
            var e = t.extend({}, this.data, i);
            return this.data = e, this.set(!0, !0)
        }
        return this.set(!0), this
    }, e.get = function () {
        return this.coords
    }, e.destroy = function () {
        this.el.removeData("coords"), delete this.el
    }, t.fn.coords = function () {
        if (this.data("coords"))return this.data("coords");
        var t = new i(this, arguments[0]);
        return this.data("coords", t), t
    }, i
}), function (t, i) {
    "function" == typeof define && define.amd ? define("gridster-collision", ["jquery", "gridster-coords"], i) : t.GridsterCollision = i(t.$ || t.jQuery, t.GridsterCoords)
}(this, function (t) {
    function i(i, s, r) {
        this.options = t.extend(e, r), this.$element = i, this.last_colliders = [], this.last_colliders_coords = [], this.set_colliders(s), this.init()
    }

    var e = {colliders_context: document.body, overlapping_region: "C"};
    i.defaults = e;
    var s = i.prototype;
    return s.init = function () {
        this.find_collisions()
    }, s.overlaps = function (t, i) {
        var e = !1, s = !1;
        return (i.x1 >= t.x1 && i.x1 <= t.x2 || i.x2 >= t.x1 && i.x2 <= t.x2 || t.x1 >= i.x1 && t.x2 <= i.x2) && (e = !0), (i.y1 >= t.y1 && i.y1 <= t.y2 || i.y2 >= t.y1 && i.y2 <= t.y2 || t.y1 >= i.y1 && t.y2 <= i.y2) && (s = !0), e && s
    }, s.detect_overlapping_region = function (t, i) {
        var e = "", s = "";
        return t.y1 > i.cy && t.y1 < i.y2 && (e = "N"), t.y2 > i.y1 && t.y2 < i.cy && (e = "S"), t.x1 > i.cx && t.x1 < i.x2 && (s = "W"), t.x2 > i.x1 && t.x2 < i.cx && (s = "E"), e + s || "C"
    }, s.calculate_overlapped_area_coords = function (i, e) {
        var s = Math.max(i.x1, e.x1), r = Math.max(i.y1, e.y1), o = Math.min(i.x2, e.x2), a = Math.min(i.y2, e.y2);
        return t({left: s, top: r, width: o - s, height: a - r}).coords().get()
    }, s.calculate_overlapped_area = function (t) {
        return t.width * t.height
    }, s.manage_colliders_start_stop = function (i, e, s) {
        for (var r = this.last_colliders_coords, o = 0, a = r.length; a > o; o++)-1 === t.inArray(r[o], i) && e.call(this, r[o]);
        for (var n = 0, h = i.length; h > n; n++)-1 === t.inArray(i[n], r) && s.call(this, i[n])
    }, s.find_collisions = function (i) {
        for (var e = this, s = this.options.overlapping_region, r = [], o = [], a = this.colliders || this.$colliders, n = a.length, h = e.$element.coords().update(i || !1).get(); n--;) {
            var _ = e.$colliders ? t(a[n]) : a[n], d = _.isCoords ? _ : _.coords(), l = d.get(), c = e.overlaps(h, l);
            if (c) {
                var p = e.detect_overlapping_region(h, l);
                if (p === s || "all" === s) {
                    var g = e.calculate_overlapped_area_coords(h, l), u = e.calculate_overlapped_area(g), f = {
                        area: u,
                        area_coords: g,
                        region: p,
                        coords: l,
                        player_coords: h,
                        el: _
                    };
                    e.options.on_overlap && e.options.on_overlap.call(this, f), r.push(d), o.push(f)
                }
            }
        }
        return (e.options.on_overlap_stop || e.options.on_overlap_start) && this.manage_colliders_start_stop(r, e.options.on_overlap_start, e.options.on_overlap_stop), this.last_colliders_coords = r, o
    }, s.get_closest_colliders = function (t) {
        var i = this.find_collisions(t);
        return i.sort(function (t, i) {
            return "C" === t.region && "C" === i.region ? t.coords.y1 < i.coords.y1 || t.coords.x1 < i.coords.x1 ? -1 : 1 : t.area < i.area ? 1 : 1
        }), i
    }, s.set_colliders = function (i) {
        "string" == typeof i || i instanceof t ? this.$colliders = t(i, this.options.colliders_context).not(this.$element) : this.colliders = t(i)
    }, t.fn.collision = function (t, e) {
        return new i(this, t, e)
    }, i
}), function (t) {
    t.delay = function (t, i) {
        var e = Array.prototype.slice.call(arguments, 2);
        return setTimeout(function () {
            return t.apply(null, e)
        }, i)
    }, t.debounce = function (t, i, e) {
        var s;
        return function () {
            var r = this, o = arguments, a = function () {
                s = null, e || t.apply(r, o)
            };
            e && !s && t.apply(r, o), clearTimeout(s), s = setTimeout(a, i)
        }
    }, t.throttle = function (t, i) {
        var e, s, r, o, a, n, h = debounce(function () {
            a = o = !1
        }, i);
        return function () {
            e = this, s = arguments;
            var _ = function () {
                r = null, a && t.apply(e, s), h()
            };
            return r || (r = setTimeout(_, i)), o ? a = !0 : n = t.apply(e, s), h(), o = !0, n
        }
    }
}(window), function (t, i) {
    "function" == typeof define && define.amd ? define("gridster-draggable", ["jquery"], i) : t.GridsterDraggable = i(t.$ || t.jQuery)
}(this, function (t) {
    function i(i, s) {
        this.options = t.extend({}, e, s), this.$document = t(document), this.$container = t(i), this.$dragitems = t(this.options.items, this.$container), this.is_dragging = !1, this.player_min_left = 0 + this.options.offset_left, this.id = h(), this.ns = ".gridster-draggable-" + this.id, this.init()
    }

    var e = {
        items: "li",
        distance: 1,
        limit: !0,
        offset_left: 0,
        autoscroll: !0,
        ignore_dragging: ["INPUT", "TEXTAREA", "SELECT", "BUTTON"],
        handle: null,
        container_width: 0,
        move_element: !0,
        helper: !1,
        remove_helper: !0
    }, s = t(window), r = {x: "left", y: "top"}, o = !!("ontouchstart" in window), a = function (t) {
        return t.charAt(0).toUpperCase() + t.slice(1)
    }, n = 0, h = function () {
        return ++n + ""
    };
    i.defaults = e;
    var _ = i.prototype;
    return _.init = function () {
        var i = this.$container.css("position");
        this.calculate_dimensions(), this.$container.css("position", "static" === i ? "relative" : i), this.disabled = !1, this.events(), t(window).bind(this.nsEvent("resize"), throttle(t.proxy(this.calculate_dimensions, this), 200))
    }, _.nsEvent = function (t) {
        return (t || "") + this.ns
    }, _.events = function () {
        this.pointer_events = {
            start: this.nsEvent("touchstart") + " " + this.nsEvent("mousedown"),
            move: this.nsEvent("touchmove") + " " + this.nsEvent("mousemove"),
            end: this.nsEvent("touchend") + " " + this.nsEvent("mouseup")
        }, this.$container.on(this.nsEvent("selectstart"), t.proxy(this.on_select_start, this)), this.$container.on(this.pointer_events.start, this.options.items, t.proxy(this.drag_handler, this)), this.$document.on(this.pointer_events.end, t.proxy(function (t) {
            this.is_dragging = !1, this.disabled || (this.$document.off(this.pointer_events.move), this.drag_start && this.on_dragstop(t))
        }, this))
    }, _.get_actual_pos = function (t) {
        var i = t.position();
        return i
    }, _.get_mouse_pos = function (t) {
        if (t.originalEvent && t.originalEvent.touches) {
            var i = t.originalEvent;
            t = i.touches.length ? i.touches[0] : i.changedTouches[0]
        }
        return {left: t.clientX, top: t.clientY}
    }, _.get_offset = function (i) {
        i.preventDefault();
        var e = this.get_mouse_pos(i), s = Math.round(e.left - this.mouse_init_pos.left), r = Math.round(e.top - this.mouse_init_pos.top), o = Math.round(this.el_init_offset.left + s - this.baseX + t(window).scrollLeft() - this.win_offset_x), a = Math.round(this.el_init_offset.top + r - this.baseY + t(window).scrollTop() - this.win_offset_y);
        return this.options.limit && (o > this.player_max_left ? o = this.player_max_left : this.player_min_left > o && (o = this.player_min_left)), {
            position: {
                left: o,
                top: a
            },
            pointer: {
                left: e.left,
                top: e.top,
                diff_left: s + (t(window).scrollLeft() - this.win_offset_x),
                diff_top: r + (t(window).scrollTop() - this.win_offset_y)
            }
        }
    }, _.get_drag_data = function (t) {
        var i = this.get_offset(t);
        return i.$player = this.$player, i.$helper = this.helper ? this.$helper : this.$player, i
    }, _.set_limits = function (t) {
        return t || (t = this.$container.width()), this.player_max_left = t - this.player_width + -this.options.offset_left, this.options.container_width = t, this
    }, _.scroll_in = function (i, e) {
        var o, n = r[i], h = 50, _ = 30, d = "x" === i, l = d ? this.window_width : this.window_height, c = d ? t(document).width() : t(document).height(), p = d ? this.$player.width() : this.$player.height(), g = s["scroll" + a(n)](), u = g, f = u + l, w = f - h, m = u + h, y = u + e.pointer[n], v = c - l + p;
        return y >= w && (o = g + _, v > o && (s["scroll" + a(n)](o), this["scroll_offset_" + i] += _)), m >= y && (o = g - _, o > 0 && (s["scroll" + a(n)](o), this["scroll_offset_" + i] -= _)), this
    }, _.manage_scroll = function (t) {
        this.scroll_in("x", t), this.scroll_in("y", t)
    }, _.calculate_dimensions = function () {
        this.window_height = s.height(), this.window_width = s.width()
    }, _.drag_handler = function (i) {
        if (i.target.nodeName, !this.disabled && (1 === i.which || o) && !this.ignore_drag(i)) {
            var e = this, s = !0;
            return this.$player = t(i.currentTarget), this.el_init_pos = this.get_actual_pos(this.$player), this.mouse_init_pos = this.get_mouse_pos(i), this.offsetY = this.mouse_init_pos.top - this.el_init_pos.top, this.$document.on(this.pointer_events.move, function (t) {
                var i = e.get_mouse_pos(t), r = Math.abs(i.left - e.mouse_init_pos.left), o = Math.abs(i.top - e.mouse_init_pos.top);
                return r > e.options.distance || o > e.options.distance ? s ? (s = !1, e.on_dragstart.call(e, t), !1) : (e.is_dragging === !0 && e.on_dragmove.call(e, t), !1) : !1
            }), o ? void 0 : !1
        }
    }, _.on_dragstart = function (i) {
        if (i.preventDefault(), this.is_dragging)return this;
        this.drag_start = this.is_dragging = !0;
        var e = this.$container.offset();
        return this.baseX = Math.round(e.left), this.baseY = Math.round(e.top), this.initial_container_width = this.options.container_width || this.$container.width(), "clone" === this.options.helper ? (this.$helper = this.$player.clone().appendTo(this.$container).addClass("helper"), this.helper = !0) : this.helper = !1, this.win_offset_y = t(window).scrollTop(), this.win_offset_x = t(window).scrollLeft(), this.scroll_offset_y = 0, this.scroll_offset_x = 0, this.el_init_offset = this.$player.offset(), this.player_width = this.$player.width(), this.player_height = this.$player.height(), this.set_limits(this.options.container_width), this.options.start && this.options.start.call(this.$player, i, this.get_drag_data(i)), !1
    }, _.on_dragmove = function (t) {
        var i = this.get_drag_data(t);
        this.options.autoscroll && this.manage_scroll(i), this.options.move_element && (this.helper ? this.$helper : this.$player).css({
            position: "absolute",
            left: i.position.left,
            top: i.position.top
        });
        var e = this.last_position || i.position;
        return i.prev_position = e, this.options.drag && this.options.drag.call(this.$player, t, i), this.last_position = i.position, !1
    }, _.on_dragstop = function (t) {
        var i = this.get_drag_data(t);
        return this.drag_start = !1, this.options.stop && this.options.stop.call(this.$player, t, i), this.helper && this.options.remove_helper && this.$helper.remove(), !1
    }, _.on_select_start = function (t) {
        return this.disabled || this.ignore_drag(t) ? void 0 : !1
    }, _.enable = function () {
        this.disabled = !1
    }, _.disable = function () {
        this.disabled = !0
    }, _.destroy = function () {
        this.disable(), this.$container.off(this.ns), this.$document.off(this.ns), t(window).off(this.ns), t.removeData(this.$container, "drag")
    }, _.ignore_drag = function (i) {
        return this.options.handle ? !t(i.target).is(this.options.handle) : t.isFunction(this.options.ignore_dragging) ? this.options.ignore_dragging(i) : t(i.target).is(this.options.ignore_dragging.join(", "))
    }, t.fn.drag = function (t) {
        return new i(this, t)
    }, i
}), function (t, i) {
    "function" == typeof define && define.amd ? define(["jquery", "gridster-draggable", "gridster-collision"], i) : t.Gridster = i(t.$ || t.jQuery, t.GridsterDraggable, t.GridsterCollision)
}(this, function (t, i) {
    function e(i, e) {
        this.options = t.extend(!0, {}, s, e), this.$el = t(i), this.$wrapper = this.$el.parent(), this.$widgets = this.$el.children(this.options.widget_selector).addClass("gs-w"), this.widgets = [], this.$changed = t([]), this.wrapper_width = this.$wrapper.width(), this.min_widget_width = 2 * this.options.widget_margins[0] + this.options.widget_base_dimensions[0], this.min_widget_height = 2 * this.options.widget_margins[1] + this.options.widget_base_dimensions[1], this.generated_stylesheets = [], this.$style_tags = t([]), this.options.auto_init && this.init()
    }

    var s = {
        namespace: "",
        widget_selector: "li",
        widget_margins: [10, 10],
        widget_base_dimensions: [400, 225],
        extra_rows: 0,
        extra_cols: 0,
        min_cols: 1,
        max_cols: 1 / 0,
        min_rows: 15,
        max_size_x: !1,
        autogrow_cols: !1,
        autogenerate_stylesheet: !0,
        avoid_overlapped_widgets: !0,
        auto_init: !0,
        serialize_params: function (t, i) {
            return {col: i.col, row: i.row, size_x: i.size_x, size_y: i.size_y}
        },
        collision: {},
        draggable: {items: ".gs-w", distance: 4, ignore_dragging: i.defaults.ignore_dragging.slice(0)},
        resize: {
            enabled: !1,
            axes: ["both"],
            handle_append_to: "",
            handle_class: "gs-resize-handle",
            max_size: [1 / 0, 1 / 0],
            min_size: [1, 1]
        }
    };
    e.defaults = s, e.generated_stylesheets = [], e.sort_by_row_asc = function (i) {
        return i = i.sort(function (i, e) {
            return i.row || (i = t(i).coords().grid, e = t(e).coords().grid), i.row > e.row ? 1 : -1
        })
    }, e.sort_by_row_and_col_asc = function (t) {
        return t = t.sort(function (t, i) {
            return t.row > i.row || t.row === i.row && t.col > i.col ? 1 : -1
        })
    }, e.sort_by_col_asc = function (t) {
        return t = t.sort(function (t, i) {
            return t.col > i.col ? 1 : -1
        })
    }, e.sort_by_row_desc = function (t) {
        return t = t.sort(function (t, i) {
            return t.row + t.size_y < i.row + i.size_y ? 1 : -1
        })
    };
    var r = e.prototype;
    return r.init = function () {
        this.options.resize.enabled && this.setup_resize(), this.generate_grid_and_stylesheet(), this.get_widgets_from_DOM(), this.set_dom_grid_height(), this.set_dom_grid_width(), this.$wrapper.addClass("ready"), this.draggable(), this.options.resize.enabled && this.resizable(), t(window).bind("resize.gridster", throttle(t.proxy(this.recalculate_faux_grid, this), 200))
    }, r.disable = function () {
        return this.$wrapper.find(".player-revert").removeClass("player-revert"), this.drag_api.disable(), this
    }, r.enable = function () {
        return this.drag_api.enable(), this
    }, r.disable_resize = function () {
        return this.$el.addClass("gs-resize-disabled"), this.resize_api.disable(), this
    }, r.enable_resize = function () {
        return this.$el.removeClass("gs-resize-disabled"), this.resize_api.enable(), this
    }, r.add_widget = function (i, e, s, r, o, a, n) {
        var h;
        e || (e = 1), s || (s = 1), !r & !o ? h = this.next_position(e, s) : (h = {
            col: r,
            row: o,
            size_x: e,
            size_y: s
        }, this.empty_cells(r, o, e, s));
        var _ = t(i).attr({
            "data-col": h.col,
            "data-row": h.row,
            "data-sizex": e,
            "data-sizey": s
        }).addClass("gs-w").appendTo(this.$el).hide();
        return this.$widgets = this.$widgets.add(_), this.register_widget(_), this.add_faux_rows(h.size_y), a && this.set_widget_max_size(_, a), n && this.set_widget_min_size(_, n), this.set_dom_grid_width(), this.set_dom_grid_height(), this.drag_api.set_limits(this.cols * this.min_widget_width), _.fadeIn()
    }, r.set_widget_min_size = function (t, i) {
        if (t = "number" == typeof t ? this.$widgets.eq(t) : t, !t.length)return this;
        var e = t.data("coords").grid;
        return e.min_size_x = i[0], e.min_size_y = i[1], this
    }, r.set_widget_max_size = function (t, i) {
        if (t = "number" == typeof t ? this.$widgets.eq(t) : t, !t.length)return this;
        var e = t.data("coords").grid;
        return e.max_size_x = i[0], e.max_size_y = i[1], this
    }, r.add_resize_handle = function (i) {
        var e = this.options.resize.handle_append_to;
        return t(this.resize_handle_tpl).appendTo(e ? t(e, i) : i), this
    }, r.resize_widget = function (t, i, e, s) {
        var r = t.coords().grid, o = r.col, a = this.options.max_cols, n = r.size_y, h = r.col, _ = h;
        i || (i = r.size_x), e || (e = r.size_y), 1 / 0 !== a && (i = Math.min(i, a - o + 1)), e > n && this.add_faux_rows(Math.max(e - n, 0));
        var d = o + i - 1;
        d > this.cols && this.add_faux_cols(d - this.cols);
        var l = {col: _, row: r.row, size_x: i, size_y: e};
        return this.mutate_widget_in_gridmap(t, r, l), this.set_dom_grid_height(), this.set_dom_grid_width(), s && s.call(this, l.size_x, l.size_y), t
    }, r.mutate_widget_in_gridmap = function (i, e, s) {
        e.size_x;
        var r = e.size_y, o = this.get_cells_occupied(e), a = this.get_cells_occupied(s), n = [];
        t.each(o.cols, function (i, e) {
            -1 === t.inArray(e, a.cols) && n.push(e)
        });
        var h = [];
        t.each(a.cols, function (i, e) {
            -1 === t.inArray(e, o.cols) && h.push(e)
        });
        var _ = [];
        t.each(o.rows, function (i, e) {
            -1 === t.inArray(e, a.rows) && _.push(e)
        });
        var d = [];
        if (t.each(a.rows, function (i, e) {
                -1 === t.inArray(e, o.rows) && d.push(e)
            }), this.remove_from_gridmap(e), h.length) {
            var l = [s.col, s.row, s.size_x, Math.min(r, s.size_y), i];
            this.empty_cells.apply(this, l)
        }
        if (d.length) {
            var c = [s.col, s.row, s.size_x, s.size_y, i];
            this.empty_cells.apply(this, c)
        }
        if (e.col = s.col, e.row = s.row, e.size_x = s.size_x, e.size_y = s.size_y, this.add_to_gridmap(s, i), i.removeClass("player-revert"), i.data("coords").update({
                width: s.size_x * this.options.widget_base_dimensions[0] + 2 * (s.size_x - 1) * this.options.widget_margins[0],
                height: s.size_y * this.options.widget_base_dimensions[1] + 2 * (s.size_y - 1) * this.options.widget_margins[1]
            }), i.attr({
                "data-col": s.col,
                "data-row": s.row,
                "data-sizex": s.size_x,
                "data-sizey": s.size_y
            }), n.length) {
            var p = [n[0], s.row, n.length, Math.min(r, s.size_y), i];
            this.remove_empty_cells.apply(this, p)
        }
        if (_.length) {
            var g = [s.col, s.row, s.size_x, s.size_y, i];
            this.remove_empty_cells.apply(this, g)
        }
        return this.move_widget_up(i), this
    }, r.empty_cells = function (i, e, s, r, o) {
        var a = this.widgets_below({col: i, row: e - r, size_x: s, size_y: r});
        return a.not(o).each(t.proxy(function (i, s) {
            var o = t(s).coords().grid;
            if (e + r - 1 >= o.row) {
                var a = e + r - o.row;
                this.move_widget_down(t(s), a)
            }
        }, this)), this.set_dom_grid_height(), this
    }, r.remove_empty_cells = function (i, e, s, r, o) {
        var a = this.widgets_below({col: i, row: e, size_x: s, size_y: r});
        return a.not(o).each(t.proxy(function (i, e) {
            this.move_widget_up(t(e), r)
        }, this)), this.set_dom_grid_height(), this
    }, r.next_position = function (t, i) {
        t || (t = 1), i || (i = 1);
        for (var s, r = this.gridmap, o = r.length, a = [], n = 1; o > n; n++) {
            s = r[n].length;
            for (var h = 1; s >= h; h++) {
                var _ = this.can_move_to({size_x: t, size_y: i}, n, h);
                _ && a.push({col: n, row: h, size_y: i, size_x: t})
            }
        }
        return a.length ? e.sort_by_row_and_col_asc(a)[0] : !1
    }, r.remove_widget = function (i, e, s) {
        var r = i instanceof t ? i : t(i), o = r.coords().grid;
        t.isFunction(e) && (s = e, e = !1), this.cells_occupied_by_placeholder = {}, this.$widgets = this.$widgets.not(r);
        var a = this.widgets_below(r);
        return this.remove_from_gridmap(o), r.fadeOut(t.proxy(function () {
            r.remove(), e || a.each(t.proxy(function (i, e) {
                this.move_widget_up(t(e), o.size_y)
            }, this)), this.set_dom_grid_height(), s && s.call(this, i)
        }, this)), this
    }, r.remove_all_widgets = function (i) {
        return this.$widgets.each(t.proxy(function (t, e) {
            this.remove_widget(e, !0, i)
        }, this)), this
    }, r.serialize = function (i) {
        return i || (i = this.$widgets), i.map(t.proxy(function (i, e) {
            var s = t(e);
            return this.options.serialize_params(s, s.coords().grid)
        }, this)).get()
    }, r.serialize_changed = function () {
        return this.serialize(this.$changed)
    }, r.dom_to_coords = function (t) {
        return {
            col: parseInt(t.attr("data-col"), 10),
            row: parseInt(t.attr("data-row"), 10),
            size_x: parseInt(t.attr("data-sizex"), 10) || 1,
            size_y: parseInt(t.attr("data-sizey"), 10) || 1,
            max_size_x: parseInt(t.attr("data-max-sizex"), 10) || !1,
            max_size_y: parseInt(t.attr("data-max-sizey"), 10) || !1,
            min_size_x: parseInt(t.attr("data-min-sizex"), 10) || !1,
            min_size_y: parseInt(t.attr("data-min-sizey"), 10) || !1,
            el: t
        }
    }, r.register_widget = function (i) {
        var e = i instanceof jQuery, s = e ? this.dom_to_coords(i) : i, r = !1;
        e || (i = s.el);
        var o = this.can_go_widget_up(s);
        return o && (s.row = o, i.attr("data-row", o), this.$el.trigger("gridster:positionchanged", [s]), r = !0), this.options.avoid_overlapped_widgets && !this.can_move_to({
            size_x: s.size_x,
            size_y: s.size_y
        }, s.col, s.row) && (t.extend(s, this.next_position(s.size_x, s.size_y)), i.attr({
            "data-col": s.col,
            "data-row": s.row,
            "data-sizex": s.size_x,
            "data-sizey": s.size_y
        }), r = !0), i.data("coords", i.coords()), i.data("coords").grid = s, this.add_to_gridmap(s, i), this.options.resize.enabled && this.add_resize_handle(i), r
    }, r.update_widget_position = function (t, i) {
        return this.for_each_cell_occupied(t, function (t, e) {
            return this.gridmap[t] ? (this.gridmap[t][e] = i, void 0) : this
        }), this
    }, r.remove_from_gridmap = function (t) {
        return this.update_widget_position(t, !1)
    }, r.add_to_gridmap = function (i, e) {
        if (this.update_widget_position(i, e || i.el), i.el) {
            var s = this.widgets_below(i.el);
            s.each(t.proxy(function (i, e) {
                this.move_widget_up(t(e))
            }, this))
        }
    }, r.draggable = function () {
        var i = this, e = t.extend(!0, {}, this.options.draggable, {
            offset_left: this.options.widget_margins[0],
            offset_top: this.options.widget_margins[1],
            container_width: this.cols * this.min_widget_width,
            limit: !0,
            start: function (e, s) {
                i.$widgets.filter(".player-revert").removeClass("player-revert"), i.$player = t(this), i.$helper = t(s.$helper), i.helper = !i.$helper.is(i.$player), i.on_start_drag.call(i, e, s), i.$el.trigger("gridster:dragstart")
            },
            stop: function (t, e) {
                i.on_stop_drag.call(i, t, e), i.$el.trigger("gridster:dragstop")
            },
            drag: throttle(function (t, e) {
                i.on_drag.call(i, t, e), i.$el.trigger("gridster:drag")
            }, 60)
        });
        return this.drag_api = this.$el.drag(e), this
    }, r.resizable = function () {
        return this.resize_api = this.$el.drag({
            items: "." + this.options.resize.handle_class,
            offset_left: this.options.widget_margins[0],
            container_width: this.container_width,
            move_element: !1,
            resize: !0,
            limit: this.options.autogrow_cols ? !1 : !0,
            start: t.proxy(this.on_start_resize, this),
            stop: t.proxy(function (i, e) {
                delay(t.proxy(function () {
                    this.on_stop_resize(i, e)
                }, this), 120)
            }, this),
            drag: throttle(t.proxy(this.on_resize, this), 60)
        }), this
    }, r.setup_resize = function () {
        this.resize_handle_class = this.options.resize.handle_class;
        var i = this.options.resize.axes, e = '<span class="' + this.resize_handle_class + " " + this.resize_handle_class + '-{type}" />';
        return this.resize_handle_tpl = t.map(i, function (t) {
            return e.replace("{type}", t)
        }).join(""), t.isArray(this.options.draggable.ignore_dragging) && this.options.draggable.ignore_dragging.push("." + this.resize_handle_class), this
    }, r.on_start_drag = function (i, e) {
        this.$helper.add(this.$player).add(this.$wrapper).addClass("dragging"), this.highest_col = this.get_highest_occupied_cell().col, this.$player.addClass("player"), this.player_grid_data = this.$player.coords().grid, this.placeholder_grid_data = t.extend({}, this.player_grid_data), this.set_dom_grid_height(this.$el.height() + this.player_grid_data.size_y * this.min_widget_height), this.set_dom_grid_width(this.cols);
        var s = this.player_grid_data.size_x, r = this.cols - this.highest_col;
        this.options.autogrow_cols && s >= r && this.add_faux_cols(Math.min(s - r, 1));
        var o = this.faux_grid, a = this.$player.data("coords").coords;
        this.cells_occupied_by_player = this.get_cells_occupied(this.player_grid_data), this.cells_occupied_by_placeholder = this.get_cells_occupied(this.placeholder_grid_data), this.last_cols = [], this.last_rows = [], this.collision_api = this.$helper.collision(o, this.options.collision), this.$preview_holder = t("<" + this.$player.get(0).tagName + " />", {
            "class": "preview-holder",
            "data-row": this.$player.attr("data-row"),
            "data-col": this.$player.attr("data-col"),
            css: {width: a.width, height: a.height}
        }).appendTo(this.$el), this.options.draggable.start && this.options.draggable.start.call(this, i, e)
    }, r.on_drag = function (t, i) {
        if (null === this.$player)return !1;
        var e = {left: i.position.left + this.baseX, top: i.position.top + this.baseY};
        if (this.options.autogrow_cols) {
            var s = this.placeholder_grid_data.col + this.placeholder_grid_data.size_x - 1;
            s >= this.cols - 1 && this.options.max_cols >= this.cols + 1 && (this.add_faux_cols(1), this.set_dom_grid_width(this.cols + 1), this.drag_api.set_limits(this.container_width)), this.collision_api.set_colliders(this.faux_grid)
        }
        this.colliders_data = this.collision_api.get_closest_colliders(e), this.on_overlapped_column_change(this.on_start_overlapping_column, this.on_stop_overlapping_column), this.on_overlapped_row_change(this.on_start_overlapping_row, this.on_stop_overlapping_row), this.helper && this.$player && this.$player.css({
            left: i.position.left,
            top: i.position.top
        }), this.options.draggable.drag && this.options.draggable.drag.call(this, t, i)
    }, r.on_stop_drag = function (t, i) {
        this.$helper.add(this.$player).add(this.$wrapper).removeClass("dragging"), i.position.left = i.position.left + this.baseX, i.position.top = i.position.top + this.baseY, this.colliders_data = this.collision_api.get_closest_colliders(i.position), this.on_overlapped_column_change(this.on_start_overlapping_column, this.on_stop_overlapping_column), this.on_overlapped_row_change(this.on_start_overlapping_row, this.on_stop_overlapping_row), this.$player.addClass("player-revert").removeClass("player").attr({
            "data-col": this.placeholder_grid_data.col,
            "data-row": this.placeholder_grid_data.row
        }).css({
            left: "",
            top: ""
        }), this.$changed = this.$changed.add(this.$player), this.cells_occupied_by_player = this.get_cells_occupied(this.placeholder_grid_data), this.set_cells_player_occupies(this.placeholder_grid_data.col, this.placeholder_grid_data.row), this.$player.coords().grid.row = this.placeholder_grid_data.row, this.$player.coords().grid.col = this.placeholder_grid_data.col, this.options.draggable.stop && this.options.draggable.stop.call(this, t, i), this.$preview_holder.remove(), this.$player = null, this.$helper = null, this.placeholder_grid_data = {}, this.player_grid_data = {}, this.cells_occupied_by_placeholder = {}, this.cells_occupied_by_player = {}, this.set_dom_grid_height(), this.set_dom_grid_width(), this.options.autogrow_cols && this.drag_api.set_limits(this.cols * this.min_widget_width)
    }, r.on_start_resize = function (i, e) {
        this.$resized_widget = e.$player.closest(".gs-w"), this.resize_coords = this.$resized_widget.coords(), this.resize_wgd = this.resize_coords.grid, this.resize_initial_width = this.resize_coords.coords.width, this.resize_initial_height = this.resize_coords.coords.height, this.resize_initial_sizex = this.resize_coords.grid.size_x, this.resize_initial_sizey = this.resize_coords.grid.size_y, this.resize_initial_col = this.resize_coords.grid.col, this.resize_last_sizex = this.resize_initial_sizex, this.resize_last_sizey = this.resize_initial_sizey, this.resize_max_size_x = Math.min(this.resize_wgd.max_size_x || this.options.resize.max_size[0], this.options.max_cols - this.resize_initial_col + 1), this.resize_max_size_y = this.resize_wgd.max_size_y || this.options.resize.max_size[1], this.resize_min_size_x = this.resize_wgd.min_size_x || this.options.resize.min_size[0] || 1, this.resize_min_size_y = this.resize_wgd.min_size_y || this.options.resize.min_size[1] || 1, this.resize_initial_last_col = this.get_highest_occupied_cell().col, this.set_dom_grid_width(this.cols), this.resize_dir = {
            right: e.$player.is("." + this.resize_handle_class + "-x"),
            bottom: e.$player.is("." + this.resize_handle_class + "-y")
        }, this.$resized_widget.css({
            "min-width": this.options.widget_base_dimensions[0],
            "min-height": this.options.widget_base_dimensions[1]
        });
        var s = this.$resized_widget.get(0).tagName;
        this.$resize_preview_holder = t("<" + s + " />", {
            "class": "preview-holder resize-preview-holder",
            "data-row": this.$resized_widget.attr("data-row"),
            "data-col": this.$resized_widget.attr("data-col"),
            css: {width: this.resize_initial_width, height: this.resize_initial_height}
        }).appendTo(this.$el), this.$resized_widget.addClass("resizing"), this.options.resize.start && this.options.resize.start.call(this, i, e, this.$resized_widget), this.$el.trigger("gridster:resizestart")
    }, r.on_stop_resize = function (i, e) {
        this.$resized_widget.removeClass("resizing").css({width: "", height: ""}), delay(t.proxy(function () {
            this.$resize_preview_holder.remove().css({
                "min-width": "",
                "min-height": ""
            }), this.options.resize.stop && this.options.resize.stop.call(this, i, e, this.$resized_widget), this.$el.trigger("gridster:resizestop")
        }, this), 300), this.set_dom_grid_width(), this.options.autogrow_cols && this.drag_api.set_limits(this.cols * this.min_widget_width)
    }, r.on_resize = function (t, i) {
        var e, s = i.pointer.diff_left, r = i.pointer.diff_top, o = this.options.widget_base_dimensions[0], a = this.options.widget_base_dimensions[1], n = this.options.widget_margins[0], h = this.options.widget_margins[1], _ = this.resize_max_size_x, d = this.resize_min_size_x, l = this.resize_max_size_y, c = this.resize_min_size_y, p = this.options.autogrow_cols, g = 1 / 0, u = 1 / 0, f = Math.ceil(s / (o + 2 * n) - .2), w = Math.ceil(r / (a + 2 * h) - .2), m = Math.max(1, this.resize_initial_sizex + f), y = Math.max(1, this.resize_initial_sizey + w), v = this.container_width / this.min_widget_width - this.resize_initial_col + 1, z = v * this.min_widget_width - 2 * n;
        if (m = Math.max(Math.min(m, _), d), m = Math.min(v, m), e = _ * o + 2 * (m - 1) * n, g = Math.min(e, z), min_width = d * o + 2 * (m - 1) * n, y = Math.max(Math.min(y, l), c), u = l * a + 2 * (y - 1) * h, min_height = c * a + 2 * (y - 1) * h, this.resize_dir.right ? y = this.resize_initial_sizey : this.resize_dir.bottom && (m = this.resize_initial_sizex), p) {
            var x = this.resize_initial_col + m - 1;
            p && x >= this.resize_initial_last_col && (this.set_dom_grid_width(Math.max(x + 1, this.cols)), x > this.cols && this.add_faux_cols(x - this.cols))
        }
        var $ = {};
        !this.resize_dir.bottom && ($.width = Math.max(Math.min(this.resize_initial_width + s, g), min_width)), !this.resize_dir.right && ($.height = Math.max(Math.min(this.resize_initial_height + r, u), min_height)), this.$resized_widget.css($), (m !== this.resize_last_sizex || y !== this.resize_last_sizey) && (this.resize_widget(this.$resized_widget, m, y), this.set_dom_grid_width(this.cols), this.$resize_preview_holder.css({
            width: "",
            height: ""
        }).attr({
            "data-row": this.$resized_widget.attr("data-row"),
            "data-sizex": m,
            "data-sizey": y
        })), this.options.resize.resize && this.options.resize.resize.call(this, t, i, this.$resized_widget), this.$el.trigger("gridster:resize"), this.resize_last_sizex = m, this.resize_last_sizey = y
    }, r.on_overlapped_column_change = function (i, e) {
        if (!this.colliders_data.length)return this;
        var s, r = this.get_targeted_columns(this.colliders_data[0].el.data.col), o = this.last_cols.length, a = r.length;
        for (s = 0; a > s; s++)-1 === t.inArray(r[s], this.last_cols) && (i || t.noop).call(this, r[s]);
        for (s = 0; o > s; s++)-1 === t.inArray(this.last_cols[s], r) && (e || t.noop).call(this, this.last_cols[s]);
        return this.last_cols = r, this
    }, r.on_overlapped_row_change = function (i, e) {
        if (!this.colliders_data.length)return this;
        var s, r = this.get_targeted_rows(this.colliders_data[0].el.data.row), o = this.last_rows.length, a = r.length;
        for (s = 0; a > s; s++)-1 === t.inArray(r[s], this.last_rows) && (i || t.noop).call(this, r[s]);
        for (s = 0; o > s; s++)-1 === t.inArray(this.last_rows[s], r) && (e || t.noop).call(this, this.last_rows[s]);
        this.last_rows = r
    }, r.set_player = function (t, i, e) {
        var s = this;
        e || this.empty_cells_player_occupies();
        var r = e ? {col: t} : s.colliders_data[0].el.data, o = r.col, a = i || r.row;
        this.player_grid_data = {
            col: o,
            row: a,
            size_y: this.player_grid_data.size_y,
            size_x: this.player_grid_data.size_x
        }, this.cells_occupied_by_player = this.get_cells_occupied(this.player_grid_data);
        var n = this.get_widgets_overlapped(this.player_grid_data), h = this.widgets_constraints(n);
        if (this.manage_movements(h.can_go_up, o, a), this.manage_movements(h.can_not_go_up, o, a), !n.length) {
            var _ = this.can_go_player_up(this.player_grid_data);
            _ !== !1 && (a = _), this.set_placeholder(o, a)
        }
        return {col: o, row: a}
    }, r.widgets_constraints = function (i) {
        var s, r = t([]), o = [], a = [];
        return i.each(t.proxy(function (i, e) {
            var s = t(e), n = s.coords().grid;
            this.can_go_widget_up(n) ? (r = r.add(s), o.push(n)) : a.push(n)
        }, this)), s = i.not(r), {can_go_up: e.sort_by_row_asc(o), can_not_go_up: e.sort_by_row_desc(a)}
    }, r.manage_movements = function (i, e, s) {
        return t.each(i, t.proxy(function (t, i) {
            var r = i, o = r.el, a = this.can_go_widget_up(r);
            if (a)this.move_widget_to(o, a), this.set_placeholder(e, a + r.size_y); else {
                var n = this.can_go_player_up(this.player_grid_data);
                if (!n) {
                    var h = s + this.player_grid_data.size_y - r.row;
                    this.move_widget_down(o, h), this.set_placeholder(e, s)
                }
            }
        }, this)), this
    }, r.is_player = function (t, i) {
        if (i && !this.gridmap[t])return !1;
        var e = i ? this.gridmap[t][i] : t;
        return e && (e.is(this.$player) || e.is(this.$helper))
    }, r.is_player_in = function (i, e) {
        var s = this.cells_occupied_by_player || {};
        return t.inArray(i, s.cols) >= 0 && t.inArray(e, s.rows) >= 0
    }, r.is_placeholder_in = function (i, e) {
        var s = this.cells_occupied_by_placeholder || {};
        return this.is_placeholder_in_col(i) && t.inArray(e, s.rows) >= 0
    }, r.is_placeholder_in_col = function (i) {
        var e = this.cells_occupied_by_placeholder || [];
        return t.inArray(i, e.cols) >= 0
    }, r.is_empty = function (t, i) {
        return this.gridmap[t] !== void 0 ? this.gridmap[t][i] !== void 0 && this.gridmap[t][i] === !1 ? !0 : !1 : !0
    }, r.is_occupied = function (t, i) {
        return this.gridmap[t] ? this.gridmap[t][i] ? !0 : !1 : !1
    }, r.is_widget = function (t, i) {
        var e = this.gridmap[t];
        return e ? (e = e[i], e ? e : !1) : !1
    }, r.is_widget_under_player = function (t, i) {
        return this.is_widget(t, i) ? this.is_player_in(t, i) : !1
    }, r.get_widgets_under_player = function (i) {
        i || (i = this.cells_occupied_by_player || {cols: [], rows: []});
        var e = t([]);
        return t.each(i.cols, t.proxy(function (s, r) {
            t.each(i.rows, t.proxy(function (t, i) {
                this.is_widget(r, i) && (e = e.add(this.gridmap[r][i]))
            }, this))
        }, this)), e
    }, r.set_placeholder = function (i, e) {
        var s = t.extend({}, this.placeholder_grid_data), r = this.widgets_below({
            col: s.col,
            row: s.row,
            size_y: s.size_y,
            size_x: s.size_x
        }), o = i + s.size_x - 1;
        o > this.cols && (i -= o - i);
        var a = e > this.placeholder_grid_data.row, n = this.placeholder_grid_data.col !== i;
        this.placeholder_grid_data.col = i, this.placeholder_grid_data.row = e, this.cells_occupied_by_placeholder = this.get_cells_occupied(this.placeholder_grid_data), this.$preview_holder.attr({
            "data-row": e,
            "data-col": i
        }), (a || n) && r.each(t.proxy(function (e, r) {
            this.move_widget_up(t(r), this.placeholder_grid_data.col - i + s.size_y)
        }, this));
        var h = this.get_widgets_under_player(this.cells_occupied_by_placeholder);
        h.length && h.each(t.proxy(function (i, r) {
            var o = t(r);
            this.move_widget_down(o, e + s.size_y - o.data("coords").grid.row)
        }, this))
    }, r.can_go_player_up = function (t) {
        var i = t.row + t.size_y - 1, e = !0, s = [], r = 1e4, o = this.get_widgets_under_player();
        return this.for_each_column_occupied(t, function (t) {
            var a = this.gridmap[t], n = i + 1;
            for (s[t] = []; --n > 0 && (this.is_empty(t, n) || this.is_player(t, n) || this.is_widget(t, n) && a[n].is(o));)s[t].push(n), r = r > n ? n : r;
            return 0 === s[t].length ? (e = !1, !0) : (s[t].sort(function (t, i) {
                return t - i
            }), void 0)
        }), e ? this.get_valid_rows(t, s, r) : !1
    }, r.can_go_widget_up = function (t) {
        var i = t.row + t.size_y - 1, e = !0, s = [], r = 1e4;
        return this.for_each_column_occupied(t, function (o) {
            var a = this.gridmap[o];
            s[o] = [];
            for (var n = i + 1; --n > 0 && (!this.is_widget(o, n) || this.is_player_in(o, n) || a[n].is(t.el));)this.is_player(o, n) || this.is_placeholder_in(o, n) || this.is_player_in(o, n) || s[o].push(n), r > n && (r = n);
            return 0 === s[o].length ? (e = !1, !0) : (s[o].sort(function (t, i) {
                return t - i
            }), void 0)
        }), e ? this.get_valid_rows(t, s, r) : !1
    }, r.get_valid_rows = function (i, e, s) {
        for (var r = i.row, o = i.row + i.size_y - 1, a = i.size_y, n = s - 1, h = []; o >= ++n;) {
            var _ = !0;
            if (t.each(e, function (i, e) {
                    t.isArray(e) && -1 === t.inArray(n, e) && (_ = !1)
                }), _ === !0 && (h.push(n), h.length === a))break
        }
        var d = !1;
        return 1 === a ? h[0] !== r && (d = h[0] || !1) : h[0] !== r && (d = this.get_consecutive_numbers_index(h, a)), d
    }, r.get_consecutive_numbers_index = function (t, i) {
        for (var e = t.length, s = [], r = !0, o = -1, a = 0; e > a; a++) {
            if (r || t[a] === o + 1) {
                if (s.push(a), s.length === i)break;
                r = !1
            } else s = [], r = !0;
            o = t[a]
        }
        return s.length >= i ? t[s[0]] : !1
    }, r.get_widgets_overlapped = function () {
        var i = t([]), e = [], s = this.cells_occupied_by_player.rows.slice(0);
        return s.reverse(), t.each(this.cells_occupied_by_player.cols, t.proxy(function (r, o) {
            t.each(s, t.proxy(function (s, r) {
                if (!this.gridmap[o])return !0;
                var a = this.gridmap[o][r];
                this.is_occupied(o, r) && !this.is_player(a) && -1 === t.inArray(a, e) && (i = i.add(a), e.push(a))
            }, this))
        }, this)), i
    }, r.on_start_overlapping_column = function (t) {
        this.set_player(t, !1)
    }, r.on_start_overlapping_row = function (t) {
        this.set_player(!1, t)
    }, r.on_stop_overlapping_column = function (t) {
        this.set_player(t, !1);
        var i = this;
        this.for_each_widget_below(t, this.cells_occupied_by_player.rows[0], function () {
            i.move_widget_up(this, i.player_grid_data.size_y)
        })
    }, r.on_stop_overlapping_row = function (t) {
        this.set_player(!1, t);
        for (var i = this, e = this.cells_occupied_by_player.cols, s = 0, r = e.length; r > s; s++)this.for_each_widget_below(e[s], t, function () {
            i.move_widget_up(this, i.player_grid_data.size_y)
        })
    }, r.move_widget_to = function (i, e) {
        var s = this, r = i.coords().grid;
        e - r.row;
        var o = this.widgets_below(i), a = this.can_move_to(r, r.col, e, i);
        return a === !1 ? !1 : (this.remove_from_gridmap(r), r.row = e, this.add_to_gridmap(r), i.attr("data-row", e), this.$changed = this.$changed.add(i), o.each(function (i, e) {
            var r = t(e), o = r.coords().grid, a = s.can_go_widget_up(o);
            a && a !== o.row && s.move_widget_to(r, a)
        }), this)
    }, r.move_widget_up = function (i, e) {
        var s = i.coords().grid, r = s.row, o = [];
        return e || (e = 1), this.can_go_up(i) ? (this.for_each_column_occupied(s, function (s) {
            if (-1 === t.inArray(i, o)) {
                var a = i.coords().grid, n = r - e;
                if (n = this.can_go_up_to_row(a, s, n), !n)return !0;
                var h = this.widgets_below(i);
                this.remove_from_gridmap(a), a.row = n, this.add_to_gridmap(a), i.attr("data-row", a.row), this.$changed = this.$changed.add(i), o.push(i), h.each(t.proxy(function (i, s) {
                    this.move_widget_up(t(s), e)
                }, this))
            }
        }), void 0) : !1
    }, r.move_widget_down = function (i, e) {
        var s, r, o, a;
        if (0 >= e)return !1;
        if (s = i.coords().grid, r = s.row, o = [], a = e, !i)return !1;
        if (-1 === t.inArray(i, o)) {
            var n = i.coords().grid, h = r + e, _ = this.widgets_below(i);
            this.remove_from_gridmap(n), _.each(t.proxy(function (i, e) {
                var s = t(e), r = s.coords().grid, o = this.displacement_diff(r, n, a);
                o > 0 && this.move_widget_down(s, o)
            }, this)), n.row = h, this.update_widget_position(n, i), i.attr("data-row", n.row), this.$changed = this.$changed.add(i), o.push(i)
        }
    }, r.can_go_up_to_row = function (i, e, s) {
        var r, o = this.gridmap, a = !0, n = [], h = i.row;
        if (this.for_each_column_occupied(i, function (t) {
                for (o[t], n[t] = [], r = h; r-- && this.is_empty(t, r) && !this.is_placeholder_in(t, r);)n[t].push(r);
                return n[t].length ? void 0 : (a = !1, !0)
            }), !a)return !1;
        for (r = s, r = 1; h > r; r++) {
            for (var _ = !0, d = 0, l = n.length; l > d; d++)n[d] && -1 === t.inArray(r, n[d]) && (_ = !1);
            if (_ === !0) {
                a = r;
                break
            }
        }
        return a
    }, r.displacement_diff = function (t, i, e) {
        var s = t.row, r = [], o = i.row + i.size_y;
        this.for_each_column_occupied(t, function (t) {
            for (var i = 0, e = o; s > e; e++)this.is_empty(t, e) && (i += 1);
            r.push(i)
        });
        var a = Math.max.apply(Math, r);
        return e -= a, e > 0 ? e : 0
    }, r.widgets_below = function (i) {
        var s = t.isPlainObject(i) ? i : i.coords().grid, r = this;
        this.gridmap;
        var o = s.row + s.size_y - 1, a = t([]);
        return this.for_each_column_occupied(s, function (i) {
            r.for_each_widget_below(i, o, function () {
                return r.is_player(this) || -1 !== t.inArray(this, a) ? void 0 : (a = a.add(this), !0)
            })
        }), e.sort_by_row_asc(a)
    }, r.set_cells_player_occupies = function (t, i) {
        return this.remove_from_gridmap(this.placeholder_grid_data), this.placeholder_grid_data.col = t, this.placeholder_grid_data.row = i, this.add_to_gridmap(this.placeholder_grid_data, this.$player), this
    }, r.empty_cells_player_occupies = function () {
        return this.remove_from_gridmap(this.placeholder_grid_data), this
    }, r.can_go_up = function (t) {
        var i = t.coords().grid, e = i.row, s = e - 1;
        this.gridmap;
        var r = !0;
        return 1 === e ? !1 : (this.for_each_column_occupied(i, function (t) {
            return this.is_widget(t, s), this.is_occupied(t, s) || this.is_player(t, s) || this.is_placeholder_in(t, s) || this.is_player_in(t, s) ? (r = !1, !0) : void 0
        }), r)
    }, r.can_move_to = function (t, i, e, s) {
        this.gridmap;
        var r = t.el, o = {size_y: t.size_y, size_x: t.size_x, col: i, row: e}, a = !0, n = i + t.size_x - 1;
        return n > this.cols ? !1 : s && e + t.size_y - 1 > s ? !1 : (this.for_each_cell_occupied(o, function (i, e) {
            var s = this.is_widget(i, e);
            !s || t.el && !s.is(r) || (a = !1)
        }), a)
    }, r.get_targeted_columns = function (t) {
        for (var i = (t || this.player_grid_data.col) + (this.player_grid_data.size_x - 1), e = [], s = t; i >= s; s++)e.push(s);
        return e
    }, r.get_targeted_rows = function (t) {
        for (var i = (t || this.player_grid_data.row) + (this.player_grid_data.size_y - 1), e = [], s = t; i >= s; s++)e.push(s);
        return e
    }, r.get_cells_occupied = function (i) {
        var e, s = {cols: [], rows: []};
        for (arguments[1] instanceof t && (i = arguments[1].coords().grid), e = 0; i.size_x > e; e++) {
            var r = i.col + e;
            s.cols.push(r)
        }
        for (e = 0; i.size_y > e; e++) {
            var o = i.row + e;
            s.rows.push(o)
        }
        return s
    }, r.for_each_cell_occupied = function (t, i) {
        return this.for_each_column_occupied(t, function (e) {
            this.for_each_row_occupied(t, function (t) {
                i.call(this, e, t)
            })
        }), this
    }, r.for_each_column_occupied = function (t, i) {
        for (var e = 0; t.size_x > e; e++) {
            var s = t.col + e;
            i.call(this, s, t)
        }
    }, r.for_each_row_occupied = function (t, i) {
        for (var e = 0; t.size_y > e; e++) {
            var s = t.row + e;
            i.call(this, s, t)
        }
    }, r._traversing_widgets = function (i, e, s, r, o) {
        var a = this.gridmap;
        if (a[s]) {
            var n, h, _ = i + "/" + e;
            if (arguments[2] instanceof t) {
                var d = arguments[2].coords().grid;
                s = d.col, r = d.row, o = arguments[3]
            }
            var l = [], c = r, p = {
                "for_each/above": function () {
                    for (; c-- && !(c > 0 && this.is_widget(s, c) && -1 === t.inArray(a[s][c], l) && (n = o.call(a[s][c], s, c), l.push(a[s][c]), n)););
                }, "for_each/below": function () {
                    for (c = r + 1, h = a[s].length; h > c && (!this.is_widget(s, c) || -1 !== t.inArray(a[s][c], l) || (n = o.call(a[s][c], s, c), l.push(a[s][c]), !n)); c++);
                }
            };
            p[_] && p[_].call(this)
        }
    }, r.for_each_widget_above = function (t, i, e) {
        return this._traversing_widgets("for_each", "above", t, i, e), this
    }, r.for_each_widget_below = function (t, i, e) {
        return this._traversing_widgets("for_each", "below", t, i, e), this
    }, r.get_highest_occupied_cell = function () {
        for (var t, i = this.gridmap, e = i[1].length, s = [], r = [], o = i.length - 1; o >= 1; o--)for (t = e - 1; t >= 1; t--)if (this.is_widget(o, t)) {
            s.push(t), r.push(o);
            break
        }
        return {col: Math.max.apply(Math, r), row: Math.max.apply(Math, s)}
    }, r.get_widgets_from = function (i, e) {
        this.gridmap;
        var s = t();
        return i && (s = s.add(this.$widgets.filter(function () {
            var e = t(this).attr("data-col");
            return e === i || e > i
        }))), e && (s = s.add(this.$widgets.filter(function () {
            var i = t(this).attr("data-row");
            return i === e || i > e
        }))), s
    }, r.set_dom_grid_height = function (t) {
        if (t === void 0) {
            var i = this.get_highest_occupied_cell().row;
            t = i * this.min_widget_height
        }
        return this.container_height = t, this.$el.css("height", this.container_height), this
    }, r.set_dom_grid_width = function (t) {
        t === void 0 && (t = this.get_highest_occupied_cell().col);
        var i = this.options.autogrow_cols ? this.options.max_cols : this.cols;
        return t = Math.min(i, Math.max(t, this.options.min_cols)), this.container_width = t * this.min_widget_width, this.$el.css("width", this.container_width), this
    }, r.generate_stylesheet = function (i) {
        var s, r = "", o = this.options.max_size_x || this.cols;
        i || (i = {}), i.cols || (i.cols = this.cols), i.rows || (i.rows = this.rows), i.namespace || (i.namespace = this.options.namespace), i.widget_base_dimensions || (i.widget_base_dimensions = this.options.widget_base_dimensions), i.widget_margins || (i.widget_margins = this.options.widget_margins), i.min_widget_width = 2 * i.widget_margins[0] + i.widget_base_dimensions[0], i.min_widget_height = 2 * i.widget_margins[1] + i.widget_base_dimensions[1];
        var a = t.param(i);
        if (t.inArray(a, e.generated_stylesheets) >= 0)return !1;
        for (this.generated_stylesheets.push(a), e.generated_stylesheets.push(a), s = i.cols; s >= 0; s--)r += i.namespace + ' [data-col="' + (s + 1) + '"] { left:' + (s * i.widget_base_dimensions[0] + s * i.widget_margins[0] + (s + 1) * i.widget_margins[0]) + "px; }\n";
        for (s = i.rows; s >= 0; s--)r += i.namespace + ' [data-row="' + (s + 1) + '"] { top:' + (s * i.widget_base_dimensions[1] + s * i.widget_margins[1] + (s + 1) * i.widget_margins[1]) + "px; }\n";
        for (var n = 1; i.rows >= n; n++)r += i.namespace + ' [data-sizey="' + n + '"] { height:' + (n * i.widget_base_dimensions[1] + (n - 1) * 2 * i.widget_margins[1]) + "px; }\n";
        for (var h = 1; o >= h; h++)r += i.namespace + ' [data-sizex="' + h + '"] { width:' + (h * i.widget_base_dimensions[0] + (h - 1) * 2 * i.widget_margins[0]) + "px; }\n";
        return this.remove_style_tags(), this.add_style_tag(r)
    }, r.add_style_tag = function (t) {
        var i = document, e = i.createElement("style");
        return i.getElementsByTagName("head")[0].appendChild(e), e.setAttribute("type", "text/css"), e.styleSheet ? e.styleSheet.cssText = t : e.appendChild(document.createTextNode(t)), this.$style_tags = this.$style_tags.add(e), this
    }, r.remove_style_tags = function () {
        var i = e.generated_stylesheets, s = this.generated_stylesheets;
        this.$style_tags.remove(), e.generated_stylesheets = t.map(i, function (i) {
            return -1 === t.inArray(i, s) ? i : void 0
        })
    }, r.generate_faux_grid = function (t, i) {
        this.faux_grid = [], this.gridmap = [];
        var e, s;
        for (e = i; e > 0; e--)for (this.gridmap[e] = [], s = t; s > 0; s--)this.add_faux_cell(s, e);
        return this
    }, r.add_faux_cell = function (i, e) {
        var s = t({
            left: this.baseX + (e - 1) * this.min_widget_width,
            top: this.baseY + (i - 1) * this.min_widget_height,
            width: this.min_widget_width,
            height: this.min_widget_height,
            col: e,
            row: i,
            original_col: e,
            original_row: i
        }).coords();
        return t.isArray(this.gridmap[e]) || (this.gridmap[e] = []), this.gridmap[e][i] = !1, this.faux_grid.push(s), this
    }, r.add_faux_rows = function (t) {
        for (var i = this.rows, e = i + (t || 1), s = e; s > i; s--)for (var r = this.cols; r >= 1; r--)this.add_faux_cell(s, r);
        return this.rows = e, this.options.autogenerate_stylesheet && this.generate_stylesheet(), this
    }, r.add_faux_cols = function (t) {
        var i = this.cols, e = i + (t || 1);
        e = Math.min(e, this.options.max_cols);
        for (var s = i + 1; e >= s; s++)for (var r = this.rows; r >= 1; r--)this.add_faux_cell(r, s);
        return this.cols = e, this.options.autogenerate_stylesheet && this.generate_stylesheet(), this
    }, r.recalculate_faux_grid = function () {
        var i = this.$wrapper.width();
        return this.baseX = (t(window).width() - i) / 2, this.baseY = this.$wrapper.offset().top, t.each(this.faux_grid, t.proxy(function (t, i) {
            this.faux_grid[t] = i.update({
                left: this.baseX + (i.data.col - 1) * this.min_widget_width,
                top: this.baseY + (i.data.row - 1) * this.min_widget_height
            })
        }, this)), this
    }, r.get_widgets_from_DOM = function () {
        var i = this.$widgets.map(t.proxy(function (i, e) {
            var s = t(e);
            return this.dom_to_coords(s)
        }, this));
        i = e.sort_by_row_and_col_asc(i);
        var s = t(i).map(t.proxy(function (t, i) {
            return this.register_widget(i) || null
        }, this));
        return s.length && this.$el.trigger("gridster:positionschanged"), this
    }, r.generate_grid_and_stylesheet = function () {
        var i = this.$wrapper.width(), e = this.options.max_cols, s = Math.floor(i / this.min_widget_width) + this.options.extra_cols, r = this.$widgets.map(function () {
            return t(this).attr("data-col")
        }).get();
        r.length || (r = [0]);
        var o = Math.max.apply(Math, r);
        this.cols = Math.max(o, s, this.options.min_cols), 1 / 0 !== e && e >= o && this.cols > e && (this.cols = e);
        var a = this.options.extra_rows;
        return this.$widgets.each(function (i, e) {
            a += +t(e).attr("data-sizey")
        }), this.rows = Math.max(a, this.options.min_rows), this.baseX = (t(window).width() - i) / 2, this.baseY = this.$wrapper.offset().top, this.options.autogenerate_stylesheet && this.generate_stylesheet(), this.generate_faux_grid(this.rows, this.cols)
    }, r.destroy = function (i) {
        return this.$el.removeData("gridster"), t(window).unbind(".gridster"), this.drag_api && this.drag_api.destroy(), this.remove_style_tags(), i && this.$el.remove(), this
    }, t.fn.gridster = function (i) {
        return this.each(function () {
            t(this).data("gridster") || t(this).data("gridster", new e(this, i))
        })
    }, e
});