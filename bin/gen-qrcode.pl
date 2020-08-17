#!/usr/bin/perl
# vi: et sts=4 sw=4 ts=4
use strict;
use warnings;
require SVG;
require Text::QRCode;
use File::Basename  qw/ dirname /;

use constant OUT => '../src/assets/qrcode.svg';

# how many image pixels each pixel of the qrcode is
use constant QR_PIXEL_DIM => 6;
# how many image pixels to pad the qrcode in
use constant PADDING => 8;
use constant T_PADDING => 3;
use constant URL => 'https://h3xx.github.io/resume';

sub qrcode_svg {
    my %opts = (
        size => 1,
        text => 'hello world',
        padding => 0,
        t_padding => 0,
        caption => undef,
        url => undef,
        font_size => 10,
        @_,
    );
    my $rows = Text::QRCode->new()->plot($opts{text});
    my $qrcode_h = scalar @{$rows};
    my $h = $qrcode_h * $opts{size} + $opts{padding} * 2;
    my $w = $qrcode_h * $opts{size} + $opts{padding} * 2;

    if ($opts{caption}) {
        my $t_sz_y = $opts{font_size};
        $h += $t_sz_y + $opts{t_padding};
    }

    my $svg = SVG->new(
        width => $w,
        height => $h,
    );

    my $layer = $svg->group(
        id => 'layer',
        style => {
            fill => 'rgb(0,0,0)',
        },
    );

    my $qrc_g = $layer->group(
        id => 'qrcode',
    );

    my @rects = &qrcode_to_rectangles($rows, $opts{size}, $opts{padding});

    $qrc_g->rectangle(%{$_}) foreach @rects;

    if ($opts{caption}) {
        my $t_group = $layer->group(
            id => 'caption',
            style => {
                'font-family' => 'sans-serif',
                'text-anchor' => 'middle',
                'font-size' => ($opts{font_size} . "px"),
            }
        );

        my %text_opts = (
            x => ($qrcode_h * $opts{size} + $opts{padding} * 2) / 2,
            y => ($h - $opts{padding}),
            -cdata => $opts{caption},
        );

        if ($opts{url}) {
            my $link = $t_group->anchor(
                -href => $opts{url}
            );
            $link->text(%text_opts);
        } else {
            $t_group->text(%text_opts);
        }
    }

    my $text = $svg->xmlify;

    # do some stripping
    $text =~ s/(^|\n)\s+//gs;

    $text
}

sub qrcode_to_rectangles {
    my (
        $rows,
        $size,
        $padding
    ) = @_;
    my @rects;
    foreach my $row_idx (0 .. $#{$rows}) {
        my $row = $rows->[$row_idx];
        foreach my $col_idx (0 .. $#{$row}) {
            if ($row->[$col_idx] eq '*') {
                # black
                push @rects, {
                    x => $col_idx * $size + $padding,
                    y => $row_idx * $size + $padding,
                    width => $size,
                    height => $size,
                };
            }
            # else ignore (transparent)
        }
    }

    &simplify_rects(@rects)
}

# simplify rectangles (minimally)
sub simplify_rects {
    my @rects = @_;
    my $num_simp = 0;

    # simplify rows AND columns of rects
    # (multiple passes to merge the big ones)
    for (0..1) {
        foreach my $rect (@rects) {
            if ($rect->{delete}) {
                next;
            }
            foreach my $cmp_rect (@rects) {
                if ($rect == $cmp_rect || $rect->{delete} || $cmp_rect->{delete}) {
                    next;
                }
                if (
                    $cmp_rect->{x} + $cmp_rect->{width} == $rect->{x} &&
                    $cmp_rect->{height} == $rect->{height} &&
                    $cmp_rect->{y} == $rect->{y}
                ) {
                    # right edge of $cmp_rect = left edge of $rect - embiggen $cmp_rect to encompass both
                    $cmp_rect->{width} += $rect->{width};
                    $rect->{delete} = 1;
                    ++$num_simp;
                } elsif (
                    $cmp_rect->{y} + $cmp_rect->{height} == $rect->{y} &&
                    $cmp_rect->{width} == $rect->{width} &&
                    $cmp_rect->{x} == $rect->{x}
                ) {
                    # bottom edge of $cmp_rect = top edge of $rect - embiggen $cmp_rect to encompass both
                    $cmp_rect->{height} += $rect->{height};
                    $rect->{delete} = 1;
                    ++$num_simp;
                }
            }
        }
    }

    printf STDERR "Simplified %d rects\n", $num_simp;
    grep { !$_->{delete} } @rects;
}

my $out = OUT;
unless ($out =~ m#^/#) {
    $out = &dirname($0) . "/$out";
}
die $out;
open my $out_h, '>', $out
    or die "Failed to open output file: $!";
print $out_h &qrcode_svg(
    text => URL,
    size => QR_PIXEL_DIM,
    padding => PADDING,
    t_padding => T_PADDING,
    caption => (URL =~ m#://(.*?)$#),
    url => URL,
    font_size => 14,
);

printf STDERR "Wrote to output file %s\n", OUT;

